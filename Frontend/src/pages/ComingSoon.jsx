import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaClock, FaTools, FaShieldAlt, FaUserSecret } from "react-icons/fa";

const ComingSoon = () => {
    const navigate = useNavigate();

    const features = [
        { name: "AI Face Detection", icon: <FaUserSecret />, desc: "Automated criminal identification system." },
        { name: "Suspicious Activity Detection", icon: <FaShieldAlt />, desc: "Real-time behavioral analysis for early prevention." }
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
            
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black -z-10"></div>
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px]"></div>

            {/* CrimeTrack Logo */}
            <motion.img 
                src="/CrimeTrack.png" 
                alt="CrimeTrack Logo" 
                className="h-20 md:h-28 object-contain mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-8 md:p-12 rounded-3xl shadow-2xl text-center relative"
            >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 p-4 rounded-2xl shadow-lg border border-blue-400">
                    <FaTools className="text-2xl animate-pulse" />
                </div>

                <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight mt-4">
                    Our Apologies!
                </h1>
                <p className="text-slate-400 text-lg md:text-xl mb-8 leading-relaxed">
                    We are currently building advanced security modules to serve you better. 
                    This feature is <span className="text-blue-400 font-bold">Coming Soon</span>.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
                    {features.map((f, i) => (
                        <div key={i} className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                            <div className="text-blue-400 text-xl bg-blue-400/10 p-3 rounded-lg">{f.icon}</div>
                            <div>
                                <h4 className="font-bold text-sm text-slate-200">{f.name}</h4>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">In Development</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-slate-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                    >
                        <FaArrowLeft /> Go Back
                    </button>
                    <button 
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center gap-2"
                    >
                        <FaClock /> Stay Tuned
                    </button>
                </div>
            </motion.div>

            <footer className="mt-12 text-slate-500 text-xs font-mono uppercase tracking-[0.2em]">
                System Update: v2.4.0-Beta
            </footer>
        </div>
    );
};

export default ComingSoon;