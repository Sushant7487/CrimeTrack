
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; 
import axios from "axios";
import Navbar from "../components/Navbar"; 
// Importing Professional Icons
import { 
  FaShieldAlt, FaUserSecret, FaMapMarkedAlt, FaFileContract, 
  FaBalanceScale, FaRobot, FaArrowRight, FaQuestionCircle 
} from "react-icons/fa";

const Home = () => {
  const [stats, setStats] = useState({
    total: 0,
    resolved: 0,
    officers: 0
  });

  const [scrolled, setScrolled] = useState(false); 

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/stats");
        setStats({
          total: data.totalComplaints || 0,
          resolved: data.resolvedCases || 0,
          officers: data.activeOfficers || 0
        });
      } catch (error) { console.error("Stats fetch failed"); }
    };
    fetchStats(); 
    const interval = setInterval(fetchStats, 5000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-white">
      
      {/* BACKGROUND VIDEO LAYER */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        {/* ✅ UPDATED: Opacity reduced to 30 for more transparency */}
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
          <source src="/Maharashtra_Police_Animation_Video_Generation.mp4" type="video/mp4" />
        </video>
      </div>

      {/* GRADIENT OVERLAY */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none"
        style={{ background: `linear-gradient(to bottom, rgba(10, 15, 30, 0.5), rgba(10, 15, 30, 0.65))` }}
      />

      <div className="relative z-10">
          <Navbar />

          {/* ================= HERO SECTION ================= */}
          <section className="relative flex flex-col md:flex-row justify-between items-center min-h-screen px-6 md:px-12 pt-28 md:pt-0 gap-6">
            
            {/* Left: CrimeTrack Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="md:w-1/4 flex justify-center order-2 md:order-1"
            >
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500 group">
                <div className="flex justify-center mb-4 h-40 relative w-full">
                    {!scrolled && (
                        <motion.img layoutId="crimetrack-logo-morph" src="/CrimeTrack.png" alt="Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-70 object-contain drop-shadow-2xl" />
                    )}
                </div>
                <p className="text-cyan-400 text-lg font-bold tracking-wide">CrimeTrack</p>
                <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">System Integrated</div>
              </div>
            </motion.div>

    

      <motion.div 
           initial={{ opacity: 0, y: 30 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 0.8 }}
           className="md:w-2/4 flex flex-col items-center text-center space-y-6 z-20 order-1 md:order-2"
         >
           <div className="inline-block px-5 py-2 border border-cyan-500/40 rounded-full bg-cyan-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default">
              <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Official Crime Reporting Portal
              </span>
           </div>

           <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
             Stay Vigilant. <br />
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
               Report Crimes.
             </span>
           </h1>

           <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed drop-shadow-md">
             Empowering citizens with a secure, anonymous, and real-time crime reporting platform. Justice is just a click away.
           </p>

           <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
             <Link to="/signup" className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transition-all transform hover:-translate-y-1">
               <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12"></div>
               <span className="relative font-bold text-base flex items-center justify-center gap-2">
                  Report Now
               </span>
             </Link>
            
             <Link to="/legalaid" className="group px-8 py-3 bg-gray-800/60 border border-gray-600 hover:border-gray-400 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:bg-gray-700/80 font-bold text-base flex items-center justify-center gap-2 shadow-lg">
               Legal Aid
             </Link>
           </div>
         </motion.div>


            {/* Right: Police Logo */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
              className="md:w-1/4 flex justify-center order-3"
            >
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500">
                <div className="flex justify-center mb-4 h-40 relative">
                    <img src="/Chandrapur_Police.png" alt="Police" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 w-50 object-contain drop-shadow-2xl" />
                </div>
                <p className="text-white text-lg font-bold tracking-wide">Maharashtra Police</p>
                <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">Protect & Serve</div>
              </div>
            </motion.div>
          </section>

          {/* ================= FEATURES SECTION (NEW CONTENT) ================= */}
          <section className="py-24 px-6 md:px-24 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Use CrimeTrack?</h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Our platform is designed with advanced technology to ensure your reports are handled securely, quickly, and effectively.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { icon: <FaUserSecret className="text-4xl text-purple-400"/>, title: "100% Anonymous", desc: "Report crimes without revealing your identity. Your privacy is protected by end-to-end encryption." },
                  { icon: <FaMapMarkedAlt className="text-4xl text-blue-400"/>, title: "Geo-Tagging", desc: "Automatically pinpoints the exact location of the incident for faster police response." },
                  { icon: <FaFileContract className="text-4xl text-green-400"/>, title: "Digital FIR", desc: "Download digitally signed FIR/NCR copies instantly after police verification." },
                  { icon: <FaShieldAlt className="text-4xl text-red-400"/>, title: "Secure Evidence", desc: "Upload photos, videos, and audio evidence directly to the secure police server." }
                ].map((feature, index) => (
                  <div key={index} className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-2 shadow-lg">
                    <div className="mb-6 bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ================= HOW IT WORKS (✅ REVERTED TO OLD STRUCTURE) ================= */}
          <section className="relative py-24 px-6 md:px-24 bg-black/60 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              <span className="border-b-4 border-blue-600 pb-2">How It Works</span>
            </h2>
            <div className="flex flex-col space-y-16 max-w-6xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-blue-500">📝</div></div>
                <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-blue-400 mb-3">1. Report a Crime</h3><p className="text-gray-300">Submit complaints securely and anonymously. Provide details and location with ease.</p></div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-purple-500">📷</div></div>
                <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-purple-400 mb-3">2. Upload Evidence</h3><p className="text-gray-300">Attach photos, videos, or documents to support your complaint and accelerate verification.</p></div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-green-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-green-500">🛡️</div></div>
                <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-green-400 mb-3">3. Police Action</h3><p className="text-gray-300">Officers investigate in real-time. Get instant status updates on your dashboard.</p></div>
              </div>
            </div>
          </section>

          {/* ================= MISSION STATEMENT (NEW CONTENT) ================= */}
          <section className="py-24 px-6 md:px-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-y border-gray-800">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                To create a safer society by leveraging technology to bridge the communication gap between citizens and law enforcement. We believe that every voice matters, and reporting crime should be safe, accessible, and transparent for everyone.
              </p>
              <div className="flex justify-center gap-4">
                <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
                <div className="h-1 w-20 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </section>






      <section className="relative py-24 px-6 md:px-24">
         <h2 className="text-4xl font-bold mb-16 text-center text-white">Real-Time Impact</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-7xl mx-auto">
            {[
              { val: stats.total, label: "Complaints Filed", color: "text-blue-400", border: "hover:border-blue-500" },
              { val: stats.resolved, label: "Cases Resolved", color: "text-green-400", border: "hover:border-green-500" },
              { val: stats.officers, label: "Active Officers", color: "text-purple-400", border: "hover:border-purple-500" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className={`p-8 bg-gray-900/80 rounded-2xl backdrop-blur-md border border-gray-700 ${item.border} transition-all duration-300 shadow-xl`}
              >
                <div className={`text-6xl font-black ${item.color} mb-3 drop-shadow-lg`}>{item.val}</div>
                <p className="text-gray-400 text-lg uppercase tracking-wider font-bold">{item.label}</p>
              </motion.div>
            ))}
         </div>
/       </section>




          {/* ================= FAQ SECTION (NEW CONTENT) ================= */}
          <section className="py-24 px-6 md:px-24 bg-gray-900/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-white mb-12 flex items-center justify-center gap-3">
                <FaQuestionCircle className="text-gray-500"/> Frequently Asked Questions
              </h2>
              <div className="grid gap-6">
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">Is my identity really kept secret?</h4>
                  <p className="text-gray-400 text-sm">Yes. If you choose 'Anonymous Reporting', we do not store your name or contact details. Only the incident details are forwarded to the police.</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">Can I track my complaint status?</h4>
                  <p className="text-gray-400 text-sm">Absolutely. You will receive a unique tracking ID after submission. You can use this ID on the 'Track Status' page or your dashboard.</p>
                </div>
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                  <h4 className="font-bold text-white mb-2">What kind of evidence can I upload?</h4>
                  <p className="text-gray-400 text-sm">Our system supports Images (JPG, PNG), Videos (MP4), and Audio recordings. Please ensure the files are clear for better investigation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* ================= CTA ================= */}
          <section className="py-32 text-center bg-gradient-to-t from-black via-black/90 to-transparent">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">Be a Responsible Citizen.</h2>
            <p className="text-gray-400 mb-12 text-xl max-w-2xl mx-auto px-4">
              Your report can save a life or prevent a crime. Join the network of vigilant citizens today.
            </p>
            <Link to="/signup" className="px-16 py-6 bg-purple-600 hover:bg-purple-700 rounded-full font-bold text-xl inline-block transition shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:scale-105">
               Get Started Now
            </Link>
          </section>

          {/* ================= FOOTER ================= */}
          <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
            <p>© 2025 CrimeTrack | Government of Maharashtra | All Rights Reserved.</p>
          </footer>

          {/* ================= FLOATING CHAT BUTTON (Fixed Icons) ================= */}
          <div className="fixed bottom-8 right-8 flex items-end z-50 flex-col space-y-3">
            <TypingChatBubble text="Need Assistance? Ask AI" />
            <Link to="/legalaid" className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex justify-center items-center shadow-2xl border-2 border-white/20 hover:scale-110 transition group">
              <FaRobot className="text-2xl text-white group-hover:rotate-12 transition-transform"/>
            </Link>
          </div>
      </div>
    </div>
  );
};

const TypingChatBubble = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) clearInterval(interval);
    }, 80);
    return () => clearInterval(interval);
  }, [text]);
  return (
    <div className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-2xl rounded-br-none shadow-xl mb-2 font-semibold text-sm animate-fade-in-up self-end mr-2 border border-gray-200">
      {displayedText}<span className="animate-pulse text-indigo-600">|</span>
    </div>
  );
};

export default Home;













