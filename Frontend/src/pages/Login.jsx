
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaLock, FaEnvelope, FaKey, FaArrowRight, FaCheckCircle, FaTimes, FaUserShield, FaExclamationCircle } from "react-icons/fa";
import { BASE_URL } from "../config"; 

// --- 🔔 NOTIFICATION SYSTEM ---
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
            className={`
                flex items-center w-full max-w-[90vw] md:max-w-sm 
                ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'}
                rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto
            `}
        >
            <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {type === 'success' ? <FaCheckCircle size={16} /> : <FaExclamationCircle size={16} />}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                    {title}
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 leading-tight truncate">
                    {message}
                </p>
            </div>
            <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
                <FaTimes size={12} />
            </button>
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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Navbar />
      <Toaster containerStyle={{ top: 20 }} />
      
      <div className="flex-1 flex flex-col justify-center items-center px-4 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 via-gray-950 to-black -z-10"></div>
        
        {/* ✅ Updated Padding: p-6 on mobile, p-8 on desktop to reduce "Zoomed" feel */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-black/60 backdrop-blur-xl border border-gray-700 p-6 md:p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
          
          {/* ✅ Smaller Font on Mobile */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 flex items-center justify-center gap-3"><FaUserShield className="text-blue-500"/> System Login</h2>
          
          <div className="grid grid-cols-3 gap-2 bg-gray-800 p-1 rounded-lg mb-6">
            {['citizen', 'police', 'senior'].map((r) => (
              <button key={r} onClick={() => setRole(r)} className={`py-2 rounded-md text-xs md:text-sm font-bold capitalize transition-all ${role === r ? "bg-blue-600 text-white shadow-lg" : "text-gray-400 hover:text-white"}`}>{r}</button>
            ))}
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
            <div>
                <label className="block text-gray-400 text-xs md:text-sm mb-1 ml-1">Email ID</label>
                {/* ✅ Reduced input height on mobile */}
                <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
                    <FaEnvelope className="text-gray-500 mr-3 text-sm md:text-base"/>
                    <input type="email" name="email" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="name@example.com" />
                </div>
            </div>
            <div>
                <label className="block text-gray-400 text-xs md:text-sm mb-1 ml-1">Password</label>
                <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
                    <FaLock className="text-gray-500 mr-3 text-sm md:text-base"/>
                    <input type="password" name="password" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="••••••••" />
                </div>
            </div>
            {(role === "police" || role === "senior") && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                    <label className={`block text-xs md:text-sm mb-1 ml-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
                    <div className="flex items-center bg-gray-900 border border-gray-600 rounded-lg px-3 md:px-4 focus-within:border-blue-500 transition-colors">
                        <FaKey className="text-gray-500 mr-3 text-sm md:text-base"/>
                        <input type="password" name="secretCode" required onChange={handleChange} className="w-full bg-transparent py-2.5 md:py-3 text-sm md:text-base text-white outline-none" placeholder="Code" />
                    </div>
                </motion.div>
            )}
            <button type="submit" disabled={loading} className={`w-full py-3 md:py-3.5 rounded-lg shadow-lg font-bold text-sm md:text-lg mt-2 transition-all hover:scale-[1.02] active:scale-95 ${role === 'police' ? "bg-purple-600 hover:bg-purple-700" : role === 'senior' ? "bg-amber-600 hover:bg-amber-700" : "bg-blue-600 hover:bg-blue-700"}`}>
              {loading ? "Verifying..." : "Login"}
            </button>
          </form>
          <div className="flex justify-between items-center mt-6 text-xs md:text-sm">
             <button onClick={() => setShowForgot(true)} className="text-blue-400 hover:text-blue-300 font-medium hover:underline">Forgot Password?</button>
             <p className="text-gray-500">New User? <Link to="/signup" className="text-white hover:text-blue-400 font-medium underline">Register</Link></p>
          </div>
        </motion.div>
      </div>
      
      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgot && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-gray-900 border border-gray-600 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
                    <button onClick={() => {setShowForgot(false); setResetStep(1);}} className="absolute top-4 right-4 text-gray-400 hover:text-white"><FaTimes size={20}/></button>
                    <h3 className="text-2xl font-bold text-white mb-2">Reset Password</h3>
                    <p className="text-gray-400 text-sm mb-6">Recover your account secure.</p>
                    {resetStep === 1 && (
                        <div className="space-y-4">
                            <label className="text-sm text-gray-400">Step 1: Enter your Email</label>
                            <input value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="name@example.com" />
                            <button onClick={sendResetOtp} className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2">Send OTP <FaArrowRight/></button>
                        </div>
                    )}
                    {resetStep === 2 && (
                        <div className="space-y-4">
                            <label className="text-sm text-gray-400">Step 2: Enter Details</label>
                            <input value={resetOtp} onChange={(e) => setResetOtp(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white font-bold tracking-widest text-center" placeholder="OTP" />
                            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="New Password" />
                            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="bg-black/40 p-3 rounded border border-gray-700 w-full text-white" placeholder="Confirm Password" />
                            <button onClick={handlePasswordReset} className="w-full bg-green-600 hover:bg-green-500 py-3 rounded-lg font-bold text-white">Reset & Login</button>
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