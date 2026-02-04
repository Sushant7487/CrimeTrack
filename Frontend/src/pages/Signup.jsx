
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { regularDesignations, seniorDesignations, policeStations } from "../data/mockData";
import { toast, Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPaperPlane, FaCheckCircle, FaIdCard, FaTimes, FaExclamationCircle } from "react-icons/fa";
import { BASE_URL } from "../config"; 

// --- 🔔 REPEATED NOTIFICATION LOGIC ---
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

const Signup = () => {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [selectedStations, setSelectedStations] = useState([]);
  const [idFile, setIdFile] = useState(null); 

  const [formData, setFormData] = useState({
    title: "Mr.", firstName: "", lastName: "", gender: "", aadhar: "", 
    email: "", mobile: "", password: "", station: "", designation: "", secretCode: "", otp: ""
  });

  const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setIdFile(e.target.files[0]);

  const handleStationSelect = (e) => {
    const value = e.target.value;
    if (value && !selectedStations.includes(value)) setSelectedStations([...selectedStations, value]);
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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Navbar />
      <Toaster containerStyle={{ top: 20 }} />

      <div className="flex-1 flex flex-col justify-center items-center px-4 py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black -z-10"></div>

        {!role && (
          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 animate-fade-in-up">
            <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("citizen")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/30 transition-all text-center group">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">👤</div>
              <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-blue-400">Citizen</h2>
              <p className="text-gray-400 text-xs md:text-sm">Report crimes, track status, legal aid.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("police")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-900/30 transition-all text-center group">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">👮‍♂️</div>
              <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-purple-400">Police Official</h2>
              <p className="text-gray-400 text-xs md:text-sm">Constables, Inspectors, Field Officers.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} onClick={() => setRole("senior")} className="bg-gray-800/50 backdrop-blur-md border border-gray-700 p-6 md:p-8 rounded-2xl cursor-pointer hover:border-amber-500 hover:shadow-2xl hover:shadow-amber-900/30 transition-all text-center group">
              <div className="text-4xl md:text-5xl mb-3 md:mb-4 group-hover:scale-110 transition-transform">🎖️</div>
              <h2 className="text-xl md:text-2xl font-bold mb-1 md:mb-2 text-white group-hover:text-amber-400">Senior Official</h2>
              <p className="text-gray-400 text-xs md:text-sm">SP, IGP, DGP (High Command).</p>
            </motion.div>
          </div>
        )}

        {role && (
          // ✅ Mobile Padding Fix: p-5 on mobile, p-10 on desktop
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-800/60 backdrop-blur-xl p-5 md:p-10 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-3xl">
            <div className="flex justify-between items-center mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 capitalize">
                    {role === 'senior' ? "High Command Registration" : `${role} Registration`}
                </h2>
                <button onClick={() => setRole(null)} className="text-xs md:text-sm text-gray-400 hover:text-white underline">Change Role</button>
            </div>

            <form onSubmit={handleSignup} className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-gray-400 text-xs md:text-sm mb-1">First Name</label>
                <div className="flex gap-2">
                    <select name="title" value={formData.title} onChange={handleChange} className="bg-gray-900/50 border border-gray-600 rounded-lg px-2 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white w-16 md:w-20 text-xs md:text-sm">
                        {titles.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <input required name="firstName" onChange={handleChange} type="text" className="flex-1 bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="First Name" />
                </div>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-gray-400 text-xs md:text-sm mb-1">Last Name</label>
                <input required name="lastName" onChange={handleChange} type="text" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-gray-400 text-xs md:text-sm mb-1">Gender</label>
                <select required name="gender" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm">
                    <option value="">Select</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                  <label className="block text-gray-400 text-xs md:text-sm mb-1">Mobile Number</label>
                  <input required name="mobile" onChange={handleChange} type="tel" maxLength="10" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="10-digit number" />
              </div>

              <div className="col-span-2 grid grid-cols-3 gap-2 items-end">
                  <div className="col-span-2">
                    <label className="block text-gray-400 text-xs md:text-sm mb-1">Email Address</label>
                    <input required name="email" onChange={handleChange} type="email" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="name@example.com" />
                  </div>
                  <button type="button" onClick={handleSendOtp} disabled={otpSent || loading} className={`h-[42px] md:h-[50px] rounded-lg font-bold text-xs md:text-sm flex items-center justify-center gap-2 transition-all ${otpSent ? "bg-green-600 text-white cursor-default" : "bg-blue-600 hover:bg-blue-500 text-white"}`}>
                    {otpSent ? <><FaCheckCircle /> Sent</> : <><FaPaperPlane /> Send OTP</>}
                  </button>
              </div>

              {otpSent && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="col-span-2">
                      <label className="block text-green-400 text-xs md:text-sm mb-1 font-bold">Enter Verification Code</label>
                      <input required name="otp" onChange={handleChange} type="text" className="w-full bg-gray-900/50 border border-green-500/50 rounded-lg px-4 py-2.5 md:py-3 focus:outline-none focus:border-green-500 text-white tracking-widest text-center text-lg" placeholder="XXXXXX" />
                  </motion.div>
              )}

              {/* ID Proof Upload */}
              <div className="col-span-2">
                  <label className="block text-gray-400 text-xs md:text-sm mb-1">Upload ID Proof (Aadhaar/PAN/Badge)</label>
                  <div className="relative border border-dashed border-gray-600 bg-gray-800/50 rounded-lg p-3 md:p-4 text-center cursor-pointer hover:border-blue-500 transition-all group">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                      <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-white">
                          <FaIdCard className="text-2xl md:text-3xl mb-1 md:mb-2" />
                          <p className="text-xs md:text-sm">{idFile ? idFile.name : "Click to Upload Photo"}</p>
                      </div>
                  </div>
              </div>

              {role === "citizen" && (
                <div className="col-span-2">
                    <label className="block text-gray-400 text-xs md:text-sm mb-1">Aadhaar Number</label>
                    <input required name="aadhar" onChange={handleChange} type="text" maxLength="12" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" placeholder="12-digit number" />
                </div>
              )}

              {(role === "police" || role === "senior") && (
                <>
                    <div className="col-span-2 md:col-span-1">
                        <label className="block text-gray-400 text-xs md:text-sm mb-1">Designation</label>
                        <select required name="designation" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-purple-500 text-white text-sm">
                            <option value="">Select Rank</option>
                            {(role === 'senior' ? seniorDesignations : regularDesignations).map(rank => <option key={rank} value={rank}>{rank}</option>)}
                        </select>
                    </div>

                    {role === 'senior' ? (
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-400 text-xs md:text-sm mb-1">Jurisdiction</label>
                            <select onChange={handleStationSelect} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-amber-500 text-white text-sm">
                                <option value="">+ Add Station</option>
                                {policeStations.map(station => <option key={station} value={station}>{station}</option>)}
                            </select>
                            <div className="flex flex-wrap gap-2 mt-2">
                                {selectedStations.map(s => (
                                    <span key={s} className="bg-amber-900/50 text-amber-200 text-[10px] md:text-xs px-2 py-1 rounded border border-amber-500/30 flex items-center gap-1">{s} <button type="button" onClick={() => removeStation(s)} className="text-amber-500 hover:text-white font-bold">×</button></span>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-gray-400 text-xs md:text-sm mb-1">Police Station</label>
                            <select required name="station" onChange={handleChange} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-purple-500 text-white text-sm">
                                <option value="">Select Station</option>
                                {policeStations.map(station => <option key={station} value={station}>{station}</option>)}
                            </select>
                        </div>
                    )}

                    <div className="col-span-2">
                        <label className={`block text-xs md:text-sm mb-1 font-bold ${role === 'senior' ? 'text-amber-400' : 'text-purple-400'}`}>{role === 'senior' ? "High Command Code" : "Secret Access Code"}</label>
                        <input required name="secretCode" onChange={handleChange} type="password" className={`w-full bg-gray-900/50 border rounded-lg px-3 md:px-4 py-2.5 md:py-3 outline-none text-white text-sm ${role === 'senior' ? 'border-amber-500/50 focus:border-amber-400' : 'border-purple-500/50 focus:border-purple-400'}`} />
                    </div>
                </>
              )}

              <div className="col-span-2">
                  <label className="block text-gray-400 text-xs md:text-sm mb-1">Password</label>
                  <input required name="password" onChange={handleChange} type="password" className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-blue-500 text-white text-sm" />
              </div>

              <div className="col-span-2 mt-4">
                <button type="submit" disabled={loading} className={`w-full py-3 md:py-4 rounded-xl font-bold text-base md:text-lg shadow-lg transition-all transform hover:-translate-y-1 disabled:opacity-50 ${role === 'citizen' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : role === 'senior' ? 'bg-gradient-to-r from-amber-600 to-orange-600' : 'bg-gradient-to-r from-purple-600 to-indigo-600'}`}>
                    {loading ? "Verifying..." : "Verify OTP & Register"}
                </button>
              </div>

            </form>
            
            <p className="mt-4 md:mt-6 text-gray-400 text-center text-xs md:text-base">Already have an account? <Link to="/login" className="text-white hover:underline">Login here</Link></p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Signup;