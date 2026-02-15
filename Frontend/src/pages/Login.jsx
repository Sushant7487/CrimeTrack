








// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { FaLock, FaEnvelope, FaKey, FaArrowRight, FaCheckCircle, FaTimes, FaUserShield, FaExclamationCircle } from "react-icons/fa";
// import { BASE_URL } from "../config"; 

// // --- 🔔 NOTIFICATION SYSTEM ---
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

// const Login = () => {
//   const [role, setRole] = useState("citizen");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showForgot, setShowForgot] = useState(false);
//   const [resetStep, setResetStep] = useState(1); 
//   const [resetEmail, setResetEmail] = useState("");
//   const [resetOtp, setResetOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [formData, setFormData] = useState({ email: "", password: "", secretCode: "" });

//   const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//         const { data } = await axios.post(`${BASE_URL}/api/users/login`, { ...formData, role });
        
//         const userTitle = data.role === 'citizen' ? data.name : `${data.designation || 'Officer'} ${data.name}`;
//         triggerNotification('success', 'Login Successful', `Welcome, ${userTitle}`);

//         localStorage.setItem("userInfo", JSON.stringify(data));
        
//         setTimeout(() => {
//             if(data.role === 'citizen') navigate("/user");
//             else if(data.role === 'senior') navigate("/senior");
//             else if(data.role === 'admin') navigate("/admin"); // ✅ NEW: Admin Redirect
//             else navigate("/police");
//         }, 1500);
//     } catch (error) {
//         const errMsg = error.response?.data?.message || "Invalid Credentials";
//         triggerNotification('error', 'Login Failed', errMsg);
//     } finally { setLoading(false); }
//   };

//   const sendResetOtp = async () => {
//       if(!resetEmail) return triggerNotification('error', 'Input Error', "Please enter your email address.");
//       try {
//           await axios.post(`${BASE_URL}/api/users/send-otp`, { email: resetEmail, type: 'forgot' });
//           triggerNotification('success', 'OTP Sent', "Check your email for the code.");
//           setResetStep(2);
//       } catch (error) { 
//           triggerNotification('error', 'Failed', error.response?.data?.message || "User not found."); 
//       }
//   };

//   const handlePasswordReset = async () => {
//       if(newPassword !== confirmPassword) return triggerNotification('error', 'Mismatch', "Passwords do not match.");
//       if(!resetOtp) return triggerNotification('error', 'Input Error', "Please enter the OTP.");
//       try {
//           await axios.post(`${BASE_URL}/api/users/reset-password`, { email: resetEmail, otp: resetOtp, newPassword });
//           triggerNotification('success', 'Success', "Password Reset! Please Login.");
//           setShowForgot(false); setResetStep(1); setResetEmail(""); setResetOtp(""); setNewPassword("");
//       } catch (error) { 
//           triggerNotification('error', 'Reset Failed', "Invalid OTP or Server Error."); 
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster containerStyle={{ top: 20 }} />
      
//       <div className="flex-1 flex flex-col justify-center items-center px-4 relative">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black -z-10"></div>
        
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/60 backdrop-blur-xl border border-gray-700 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md relative overflow-hidden">
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-3"><FaUserShield className="text-blue-500"/> System Login</h2>
          
//           {/* ✅ UPDATED: Added Admin Role Button */}
//           <div className="grid grid-cols-4 gap-2 bg-gray-800 p-1 rounded-lg mb-6">
//             {['citizen', 'police', 'senior', 'admin'].map((r) => (
//               <button key={r} onClick={() => setRole(r)} className={`py-2 rounded-md text-[10px] md:text-sm font-bold capitalize transition-all ${role === r ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>{r}</button>
//             ))}
//           </div>
          
//           <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
//             <div>
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1 ml-1">Email ID</label>
//                 <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
//                     <FaEnvelope className="text-gray-500 mr-3 text-sm md:text-base"/>
//                     <input type="email" name="email" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="name@example.com" />
//                 </div>
//             </div>
//             <div>
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1 ml-1">Password</label>
//                 <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
//                     <FaLock className="text-gray-500 mr-3 text-sm md:text-base"/>
//                     <input type="password" name="password" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="••••••••" />
//                 </div>
//             </div>
//             {(role === "police" || role === "senior") && (
//                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
//                     <label className={`block text-xs md:text-sm mb-1 ml-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
//                     <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
//                         <FaKey className="text-gray-500 mr-3 text-sm md:text-base"/>
//                         <input type="password" name="secretCode" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="Code" />
//                     </div>
//                 </motion.div>
//             )}
//             <button type="submit" disabled={loading} className={`w-full py-3 md:py-3.5 rounded-lg shadow-lg font-bold text-sm md:text-lg mt-2 transition-all hover:scale-[1.02] active:scale-95 ${role === 'police' ? "bg-purple-600 hover:bg-purple-700" : role === 'senior' ? "bg-amber-600 hover:bg-amber-700" : role === 'admin' ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}>
//               {loading ? "Verifying..." : "Login"}
//             </button>
//           </form>
//           <div className="flex justify-between items-center mt-6 text-xs md:text-sm">
//              <button onClick={() => setShowForgot(true)} className="text-blue-400 hover:text-blue-300 font-medium hover:underline">Forgot Password?</button>
//              <p className="text-gray-500">New User? <Link to="/signup" className="text-white hover:text-blue-400 font-medium underline">Register</Link></p>
//           </div>
//         </motion.div>
//       </div>
      
//       <AnimatePresence>
//         {showForgot && (
//             <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gray-900 border border-gray-600 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
//                     <button onClick={() => {setShowForgot(false); setResetStep(1);}} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FaTimes size={20}/></button>
//                     <h3 className="text-2xl font-bold text-white mb-2">Reset Password</h3>
//                     <p className="text-gray-400 text-sm mb-6">Recover your account secure.</p>
//                     {resetStep === 1 && (
//                         <div className="space-y-4">
//                             <label className="text-sm text-gray-400">Step 1: Enter your Email</label>
//                             <input value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="name@example.com" />
//                             <button onClick={sendResetOtp} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2">Send OTP <FaArrowRight/></button>
//                         </div>
//                     )}
//                     {resetStep === 2 && (
//                         <div className="space-y-4">
//                             <label className="text-sm text-gray-400">Step 2: Enter Details</label>
//                             <input value={resetOtp} onChange={(e) => setResetOtp(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white font-bold tracking-widest text-center" placeholder="OTP" />
//                             <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="New Password" />
//                             <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="Confirm Password" />
//                             <button onClick={handlePasswordReset} className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold text-white">Reset & Login</button>
//                         </div>
//                     )}
//                 </motion.div>
//             </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Login;






// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import { motion, AnimatePresence } from "framer-motion";
// import axios from "axios";
// import { FaLock, FaEnvelope, FaKey, FaArrowRight, FaCheckCircle, FaTimes, FaUserShield, FaExclamationCircle } from "react-icons/fa";
// import { BASE_URL } from "../config"; 

// // --- 🔔 NOTIFICATION SYSTEM ---
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

// const Login = () => {
//   const [role, setRole] = useState("citizen");
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showForgot, setShowForgot] = useState(false);
//   const [resetStep, setResetStep] = useState(1); 
//   const [resetEmail, setResetEmail] = useState("");
//   const [resetOtp, setResetOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [formData, setFormData] = useState({ email: "", password: "", secretCode: "" });

//   const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//         const { data } = await axios.post(`${BASE_URL}/api/users/login`, { ...formData, role });
        
//         const userTitle = data.role === 'citizen' ? data.name : `${data.designation || 'Officer'} ${data.name}`;
//         triggerNotification('success', 'Login Successful', `Welcome, ${userTitle}`);

//         localStorage.setItem("userInfo", JSON.stringify(data));
        
//         setTimeout(() => {
//             if(data.role === 'citizen') navigate("/user");
//             else if(data.role === 'senior') navigate("/senior");
//             else if(data.role === 'admin') navigate("/admin"); // ✅ NEW: Admin Redirect
//             else navigate("/police");
//         }, 1500);
//     } catch (error) {
//         const errMsg = error.response?.data?.message || "Invalid Credentials";
//         triggerNotification('error', 'Login Failed', errMsg);
//     } finally { setLoading(false); }
//   };

//   const sendResetOtp = async () => {
//       if(!resetEmail) return triggerNotification('error', 'Input Error', "Please enter your email address.");
//       try {
//           await axios.post(`${BASE_URL}/api/users/send-otp`, { email: resetEmail, type: 'forgot' });
//           triggerNotification('success', 'OTP Sent', "Check your email for the code.");
//           setResetStep(2);
//       } catch (error) { 
//           triggerNotification('error', 'Failed', error.response?.data?.message || "User not found."); 
//       }
//   };

//   const handlePasswordReset = async () => {
//       if(newPassword !== confirmPassword) return triggerNotification('error', 'Mismatch', "Passwords do not match.");
//       if(!resetOtp) return triggerNotification('error', 'Input Error', "Please enter the OTP.");
//       try {
//           await axios.post(`${BASE_URL}/api/users/reset-password`, { email: resetEmail, otp: resetOtp, newPassword });
//           triggerNotification('success', 'Success', "Password Reset! Please Login.");
//           setShowForgot(false); setResetStep(1); setResetEmail(""); setResetOtp(""); setNewPassword("");
//       } catch (error) { 
//           triggerNotification('error', 'Reset Failed', "Invalid OTP or Server Error."); 
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
//       <Navbar />
//       <Toaster containerStyle={{ top: 20 }} />
      
//       <div className="flex-1 flex flex-col justify-center items-center px-4 relative">
//         <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black -z-10"></div>
        
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/60 backdrop-blur-xl border border-gray-700 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md relative overflow-hidden">
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          
//           <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-3"><FaUserShield className="text-blue-500"/> System Login</h2>
          
//           {/* ✅ UPDATED: Added Admin Role Button */}
//           <div className="grid grid-cols-4 gap-2 bg-gray-800 p-1 rounded-lg mb-6">
//             {['citizen', 'police', 'senior', 'admin'].map((r) => (
//               <button key={r} onClick={() => setRole(r)} className={`py-2 rounded-md text-[10px] md:text-sm font-bold capitalize transition-all ${role === r ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>{r}</button>
//             ))}
//           </div>
          
//           <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
//             <div>
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1 ml-1">Email ID</label>
//                 <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
//                     <FaEnvelope className="text-gray-500 mr-3 text-sm md:text-base"/>
//                     <input type="email" name="email" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="name@example.com" />
//                 </div>
//             </div>
//             <div>
//                 <label className="block text-gray-400 text-xs md:text-sm mb-1 ml-1">Password</label>
//                 <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
//                     <FaLock className="text-gray-500 mr-3 text-sm md:text-base"/>
//                     <input type="password" name="password" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="••••••••" />
//                 </div>
//             </div>
//             {(role === "police" || role === "senior") && (
//                 <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
//                     <label className={`block text-xs md:text-sm mb-1 ml-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
//                     <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
//                         <FaKey className="text-gray-500 mr-3 text-sm md:text-base"/>
//                         <input type="password" name="secretCode" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="Code" />
//                     </div>
//                 </motion.div>
//             )}
//             <button type="submit" disabled={loading} className={`w-full py-3 md:py-3.5 rounded-lg shadow-lg font-bold text-sm md:text-lg mt-2 transition-all hover:scale-[1.02] active:scale-95 ${role === 'police' ? "bg-purple-600 hover:bg-purple-700" : role === 'senior' ? "bg-amber-600 hover:bg-amber-700" : role === 'admin' ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}>
//               {loading ? "Verifying..." : "Login"}
//             </button>
//           </form>
//           <div className="flex justify-between items-center mt-6 text-xs md:text-sm">
//              <button onClick={() => setShowForgot(true)} className="text-blue-400 hover:text-blue-300 font-medium hover:underline">Forgot Password?</button>
//              <p className="text-gray-500">New User? <Link to="/signup" className="text-white hover:text-blue-400 font-medium underline">Register</Link></p>
//           </div>
//         </motion.div>
//       </div>
      
//       <AnimatePresence>
//         {showForgot && (
//             <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
//                 <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gray-900 border border-gray-600 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
//                     <button onClick={() => {setShowForgot(false); setResetStep(1);}} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FaTimes size={20}/></button>
//                     <h3 className="text-2xl font-bold text-white mb-2">Reset Password</h3>
//                     <p className="text-gray-400 text-sm mb-6">Recover your account secure.</p>
//                     {resetStep === 1 && (
//                         <div className="space-y-4">
//                             <label className="text-sm text-gray-400">Step 1: Enter your Email</label>
//                             <input value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="name@example.com" />
//                             <button onClick={sendResetOtp} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2">Send OTP <FaArrowRight/></button>
//                         </div>
//                     )}
//                     {resetStep === 2 && (
//                         <div className="space-y-4">
//                             <label className="text-sm text-gray-400">Step 2: Enter Details</label>
//                             <input value={resetOtp} onChange={(e) => setResetOtp(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white font-bold tracking-widest text-center" placeholder="OTP" />
//                             <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="New Password" />
//                             <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="Confirm Password" />
//                             <button onClick={handlePasswordReset} className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold text-white">Reset & Login</button>
//                         </div>
//                     )}
//                 </motion.div>
//             </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Login;












import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaLock, FaEnvelope, FaKey, FaArrowRight, FaCheckCircle, FaTimes, FaUserShield, FaExclamationCircle } from "react-icons/fa";
import { BASE_URL } from "../config"; 

// ✅ IMPORTED BACKGROUND IMAGE
import signupBg from '../assets/signup-bg.png';

// --- NOTIFICATION HELPERS ---
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

const Login = () => {
  const [role, setRole] = useState("citizen");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [resetStep, setResetStep] = useState(1); 
  const [resetEmail, setResetEmail] = useState("");
  const [resetOtp, setResetOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "", secretCode: "" });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        const { data } = await axios.post(`${BASE_URL}/api/users/login`, { ...formData, role });
        
        const userTitle = data.role === 'citizen' ? data.name : `${data.designation || 'Officer'} ${data.name}`;
        triggerNotification('success', 'Login Successful', `Welcome, ${userTitle}`);

        localStorage.setItem("userInfo", JSON.stringify(data));
        
        setTimeout(() => {
            if(data.role === 'citizen') navigate("/user");
            else if(data.role === 'senior') navigate("/senior");
            else if(data.role === 'admin') navigate("/admin");
            else navigate("/police");
        }, 1500);
    } catch (error) {
        const errMsg = error.response?.data?.message || "Invalid Credentials";
        triggerNotification('error', 'Login Failed', errMsg);
    } finally { setLoading(false); }
  };

  const sendResetOtp = async () => {
      if(!resetEmail) return triggerNotification('error', 'Input Error', "Please enter your email address.");
      try {
          await axios.post(`${BASE_URL}/api/users/send-otp`, { email: resetEmail, type: 'forgot' });
          triggerNotification('success', 'OTP Sent', "Check your email for the code.");
          setResetStep(2);
      } catch (error) { 
          triggerNotification('error', 'Failed', error.response?.data?.message || "User not found."); 
      }
  };

  const handlePasswordReset = async () => {
      if(newPassword !== confirmPassword) return triggerNotification('error', 'Mismatch', "Passwords do not match.");
      if(!resetOtp) return triggerNotification('error', 'Input Error', "Please enter the OTP.");
      try {
          await axios.post(`${BASE_URL}/api/users/reset-password`, { email: resetEmail, otp: resetOtp, newPassword });
          triggerNotification('success', 'Success', "Password Reset! Please Login.");
          setShowForgot(false); setResetStep(1); setResetEmail(""); setResetOtp(""); setNewPassword("");
      } catch (error) { 
          triggerNotification('error', 'Reset Failed', "Invalid OTP or Server Error."); 
      }
  };

  // ✅ ADJUSTED FOR MOBILE: Smaller padding and font size
  const inputContainerStyle = "flex items-center bg-slate-900/50 border border-slate-600 rounded-xl px-3 py-2.5 md:px-4 md:py-3 focus-within:border-blue-500 transition-all shadow-inner";
  const inputFieldStyle = "w-full bg-transparent text-white text-xs md:text-sm font-mono font-bold tracking-wide outline-none ml-2 md:ml-3";

  return (
    <div className="min-h-screen text-white flex flex-col font-sans relative">
      <Navbar />
      <Toaster containerStyle={{ top: 20 }} />
      
      {/* --- BACKGROUND IMAGE --- */}
      <div className="fixed inset-0 z-0">
          <img 
            src={signupBg} 
            alt="Background" 
            className="fixed inset-0 w-full h-full object-fill opacity-90 z-0" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-gray-900/90 to-black/95"></div>
      </div>

      {/* ✅ MOBILE FIX: Reduced padding (py-12 on mobile, py-24 on desktop) */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-24 relative z-10">
        
        <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6, ease: "circOut" }}
            className="relative w-full max-w-sm md:max-w-md p-[2px] rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 shadow-2xl"
        >
          {/* ✅ MOBILE FIX: Reduced inner padding */}
          <div className="bg-gray-900/90 backdrop-blur-2xl p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] relative overflow-hidden">
            
            {/* Top Glow Line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            
            {/* ✅ MOBILE FIX: Smaller heading */}
            <h2 className="text-xl md:text-3xl font-black text-center mb-6 md:mb-8 flex items-center justify-center gap-2 md:gap-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-blue-300">
                <FaUserShield className="text-blue-400 drop-shadow-md text-lg md:text-3xl"/> System Login
            </h2>
            
            {/* Role Switcher - Compact on Mobile */}
            <div className="grid grid-cols-4 gap-1.5 md:gap-2 bg-slate-800/50 p-1 md:p-1.5 rounded-xl mb-6 md:mb-8 border border-slate-700">
                {['citizen', 'police', 'senior', 'admin'].map((r) => (
                    <button 
                        key={r} 
                        onClick={() => setRole(r)} 
                        className={`py-1.5 md:py-2 rounded-lg text-[9px] md:text-xs font-bold uppercase tracking-wide transition-all ${role === r ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
                    >
                        {r}
                    </button>
                ))}
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
                <div>
                    <label className="block text-gray-400 text-[10px] md:text-xs font-bold mb-1 ml-1">EMAIL ID</label>
                    <div className={inputContainerStyle}>
                        <FaEnvelope className="text-gray-500 text-sm md:text-lg"/>
                        <input type="email" name="email" required onChange={handleChange} className={inputFieldStyle} placeholder="name@example.com" />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-400 text-[10px] md:text-xs font-bold mb-1 ml-1">PASSWORD</label>
                    <div className={inputContainerStyle}>
                        <FaLock className="text-gray-500 text-sm md:text-lg"/>
                        <input type="password" name="password" required onChange={handleChange} className={inputFieldStyle} placeholder="••••••••" />
                    </div>
                </div>

                {(role === "police" || role === "senior") && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                        <label className={`block text-[10px] md:text-xs font-bold mb-1 ml-1 ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>
                            {role === 'senior' ? "HIGH COMMAND CODE" : "SECRET ACCESS CODE"}
                        </label>
                        <div className={`${inputContainerStyle} ${role === 'senior' ? 'focus-within:border-amber-500' : 'focus-within:border-purple-500'}`}>
                            <FaKey className={`text-sm md:text-lg ${role === 'senior' ? 'text-amber-500' : 'text-purple-500'}`}/>
                            <input type="password" name="secretCode" required onChange={handleChange} className={inputFieldStyle} placeholder="Enter Code" />
                        </div>
                    </motion.div>
                )}

                {/* ✅ MOBILE FIX: Smaller button height */}
                <button 
                    type="submit" 
                    disabled={loading} 
                    className={`w-full py-2.5 md:py-3.5 rounded-xl font-black text-xs md:text-lg shadow-xl mt-2 transition-all transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                    ${role === 'police' ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500" 
                    : role === 'senior' ? "bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500" 
                    : role === 'admin' ? "bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500" 
                    : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500"}`}
                >
                    {loading ? "VERIFYING..." : "SECURE LOGIN"}
                </button>
            </form>

            <div className="flex justify-between items-center mt-6 md:mt-8 text-[10px] md:text-sm">
                <button onClick={() => setShowForgot(true)} className="text-gray-400 hover:text-blue-400 font-bold transition-colors">Forgot Password?</button>
                <p className="text-gray-500 font-medium">New User? <Link to="/signup" className="text-white hover:text-blue-400 font-bold underline decoration-blue-500/50 transition-colors">Register</Link></p>
            </div>

          </div>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {showForgot && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-slate-900 border border-slate-600 w-full max-w-sm md:max-w-md rounded-2xl shadow-2xl p-6 md:p-8 relative">
                    <button onClick={() => {setShowForgot(false); setResetStep(1);}} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-transform hover:rotate-90"><FaTimes size={18}/></button>
                    <h3 className="text-xl md:text-2xl font-black text-white mb-2">Reset Password</h3>
                    <p className="text-gray-400 text-xs md:text-sm mb-6">Recover your account securely.</p>
                    
                    {resetStep === 1 && (
                        <div className="space-y-4 md:space-y-5">
                            <div>
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 mb-1 block">STEP 1: ENTER EMAIL</label>
                                <input value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className={inputContainerStyle.replace('flex items-center', '') + " w-full text-white"} placeholder="name@example.com" />
                            </div>
                            <button onClick={sendResetOtp} className="w-full bg-blue-600 hover:bg-blue-500 py-2.5 md:py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg hover:-translate-y-1 text-xs md:text-sm">Send OTP <FaArrowRight/></button>
                        </div>
                    )}
                    {resetStep === 2 && (
                        <div className="space-y-4 md:space-y-5">
                            <div>
                                <label className="text-[10px] md:text-xs font-bold text-gray-400 mb-1 block">STEP 2: VERIFY & RESET</label>
                                <input value={resetOtp} onChange={(e) => setResetOtp(e.target.value)} className={inputContainerStyle.replace('flex items-center', '') + " w-full text-white text-center tracking-[0.5em] font-bold"} placeholder="OTP" />
                            </div>
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className={inputContainerStyle.replace('flex items-center', '') + " w-full text-white"} placeholder="New Password" />
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={inputContainerStyle.replace('flex items-center', '') + " w-full text-white"} placeholder="Confirm Password" />
                            <button onClick={handlePasswordReset} className="w-full bg-green-600 hover:bg-green-500 py-2.5 md:py-3 rounded-xl font-bold text-white shadow-lg hover:-translate-y-1 transition-all text-xs md:text-sm">Reset & Login</button>
                        </div>
                    )}
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;