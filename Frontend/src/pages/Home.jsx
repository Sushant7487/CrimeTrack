
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion"; 
// import axios from "axios";
// import Navbar from "../components/Navbar"; 
// // Importing Professional Icons
// import { 
//   FaShieldAlt, FaUserSecret, FaMapMarkedAlt, FaFileContract, 
//   FaBalanceScale, FaRobot, FaArrowRight, FaQuestionCircle 
// } from "react-icons/fa";

// const Home = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     resolved: 0,
//     officers: 0
//   });

//   const [scrolled, setScrolled] = useState(false); 

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/stats");
//         setStats({
//           total: data.totalComplaints || 0,
//           resolved: data.resolvedCases || 0,
//           officers: data.activeOfficers || 0
//         });
//       } catch (error) { console.error("Stats fetch failed"); }
//     };
//     fetchStats(); 
//     const interval = setInterval(fetchStats, 5000); 
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-white">
      
//       {/* BACKGROUND VIDEO LAYER */}
//       <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
//         {/* ✅ UPDATED: Opacity reduced to 30 for more transparency */}
//         <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
//           <source src="/Maharashtra_Police_Animation_Video_Generation.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* GRADIENT OVERLAY */}
//       <div 
//         className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none"
//         style={{ background: `linear-gradient(to bottom, rgba(10, 15, 30, 0.5), rgba(10, 15, 30, 0.65))` }}
//       />

//       <div className="relative z-10">
//           <Navbar />

//           {/* ================= HERO SECTION ================= */}
//           <section className="relative flex flex-col md:flex-row justify-between items-center min-h-screen px-6 md:px-12 pt-28 md:pt-0 gap-6">
            
//             {/* Left: CrimeTrack Logo */}
//             <motion.div 
//               initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
//               className="md:w-1/4 flex justify-center order-2 md:order-1"
//             >
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500 group">
//                 <div className="flex justify-center mb-4 h-40 relative w-full">
//                     {!scrolled && (
//                         <motion.img layoutId="crimetrack-logo-morph" src="/CrimeTrack.png" alt="Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-70 object-contain drop-shadow-2xl" />
//                     )}
//                 </div>
//                 <p className="text-cyan-400 text-lg font-bold tracking-wide">CrimeTrack</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">System Integrated</div>
//               </div>
//             </motion.div>

    

//       <motion.div 
//            initial={{ opacity: 0, y: 30 }} 
//            animate={{ opacity: 1, y: 0 }} 
//            transition={{ duration: 0.8 }}
//            className="md:w-2/4 flex flex-col items-center text-center space-y-6 z-20 order-1 md:order-2"
//          >
//            <div className="inline-block px-5 py-2 border border-cyan-500/40 rounded-full bg-cyan-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default">
//               <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
//                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Official Crime Reporting Portal
//               </span>
//            </div>

//            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
//              Stay Vigilant. <br />
//              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">
//                Report Crimes.
//              </span>
//            </h1>

//            <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed drop-shadow-md">
//              Empowering citizens with a secure, anonymous, and real-time crime reporting platform. Justice is just a click away.
//            </p>

//            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
//              <Link to="/signup" className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transition-all transform hover:-translate-y-1">
//                <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12"></div>
//                <span className="relative font-bold text-base flex items-center justify-center gap-2">
//                   Report Now
//                </span>
//              </Link>
            
//              <Link to="/legalaid" className="group px-8 py-3 bg-gray-800/60 border border-gray-600 hover:border-gray-400 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:bg-gray-700/80 font-bold text-base flex items-center justify-center gap-2 shadow-lg">
//                Legal Aid
//              </Link>
//            </div>
//          </motion.div>


//             {/* Right: Police Logo */}
//             <motion.div 
//               initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
//               className="md:w-1/4 flex justify-center order-3"
//             >
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500">
//                 <div className="flex justify-center mb-4 h-40 relative">
//                     <img src="/Chandrapur_Police.png" alt="Police" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 w-50 object-contain drop-shadow-2xl" />
//                 </div>
//                 <p className="text-white text-lg font-bold tracking-wide">Maharashtra Police</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">Protect & Serve</div>
//               </div>
//             </motion.div>
//           </section>

//           {/* ================= FEATURES SECTION (NEW CONTENT) ================= */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
//             <div className="max-w-7xl mx-auto">
//               <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Use CrimeTrack?</h2>
//                 <p className="text-gray-400 max-w-2xl mx-auto">Our platform is designed with advanced technology to ensure your reports are handled securely, quickly, and effectively.</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {[
//                   { icon: <FaUserSecret className="text-4xl text-purple-400"/>, title: "100% Anonymous", desc: "Report crimes without revealing your identity. Your privacy is protected by end-to-end encryption." },
//                   { icon: <FaMapMarkedAlt className="text-4xl text-blue-400"/>, title: "Geo-Tagging", desc: "Automatically pinpoints the exact location of the incident for faster police response." },
//                   { icon: <FaFileContract className="text-4xl text-green-400"/>, title: "Digital FIR", desc: "Download digitally signed FIR/NCR copies instantly after police verification." },
//                   { icon: <FaShieldAlt className="text-4xl text-red-400"/>, title: "Secure Evidence", desc: "Upload photos, videos, and audio evidence directly to the secure police server." }
//                 ].map((feature, index) => (
//                   <div key={index} className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-2 shadow-lg">
//                     <div className="mb-6 bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">{feature.icon}</div>
//                     <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                     <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* ================= HOW IT WORKS (✅ REVERTED TO OLD STRUCTURE) ================= */}
//           <section className="relative py-24 px-6 md:px-24 bg-black/60 backdrop-blur-sm">
//             <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
//               <span className="border-b-4 border-blue-600 pb-2">How It Works</span>
//             </h2>
//             <div className="flex flex-col space-y-16 max-w-6xl mx-auto">
//               {/* Step 1 */}
//               <div className="flex flex-col md:flex-row items-center gap-10">
//                 <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-blue-500">📝</div></div>
//                 <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-blue-400 mb-3">1. Report a Crime</h3><p className="text-gray-300">Submit complaints securely and anonymously. Provide details and location with ease.</p></div>
//               </div>
//               {/* Step 2 */}
//               <div className="flex flex-col md:flex-row-reverse items-center gap-10">
//                 <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-purple-500">📷</div></div>
//                 <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-purple-400 mb-3">2. Upload Evidence</h3><p className="text-gray-300">Attach photos, videos, or documents to support your complaint and accelerate verification.</p></div>
//               </div>
//               {/* Step 3 */}
//               <div className="flex flex-col md:flex-row items-center gap-10">
//                 <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-green-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-green-500">🛡️</div></div>
//                 <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-green-400 mb-3">3. Police Action</h3><p className="text-gray-300">Officers investigate in real-time. Get instant status updates on your dashboard.</p></div>
//               </div>
//             </div>
//           </section>

//           {/* ================= MISSION STATEMENT (NEW CONTENT) ================= */}
//           <section className="py-24 px-6 md:px-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-y border-gray-800">
//             <div className="max-w-4xl mx-auto text-center">
//               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
//               <p className="text-lg text-gray-300 leading-relaxed mb-8">
//                 To create a safer society by leveraging technology to bridge the communication gap between citizens and law enforcement. We believe that every voice matters, and reporting crime should be safe, accessible, and transparent for everyone.
//               </p>
//               <div className="flex justify-center gap-4">
//                 <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
//                 <div className="h-1 w-20 bg-purple-500 rounded-full"></div>
//               </div>
//             </div>
//           </section>






//       <section className="relative py-24 px-6 md:px-24">
//          <h2 className="text-4xl font-bold mb-16 text-center text-white">Real-Time Impact</h2>
//          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-7xl mx-auto">
//             {[
//               { val: stats.total, label: "Complaints Filed", color: "text-blue-400", border: "hover:border-blue-500" },
//               { val: stats.resolved, label: "Cases Resolved", color: "text-green-400", border: "hover:border-green-500" },
//               { val: stats.officers, label: "Active Officers", color: "text-purple-400", border: "hover:border-purple-500" }
//             ].map((item, idx) => (
//               <motion.div 
//                 key={idx}
//                 whileHover={{ y: -10 }}
//                 className={`p-8 bg-gray-900/80 rounded-2xl backdrop-blur-md border border-gray-700 ${item.border} transition-all duration-300 shadow-xl`}
//               >
//                 <div className={`text-6xl font-black ${item.color} mb-3 drop-shadow-lg`}>{item.val}</div>
//                 <p className="text-gray-400 text-lg uppercase tracking-wider font-bold">{item.label}</p>
//               </motion.div>
//             ))}
//          </div>
// /       </section>




//           {/* ================= FAQ SECTION (NEW CONTENT) ================= */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/30">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold text-center text-white mb-12 flex items-center justify-center gap-3">
//                 <FaQuestionCircle className="text-gray-500"/> Frequently Asked Questions
//               </h2>
//               <div className="grid gap-6">
//                 <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
//                   <h4 className="font-bold text-white mb-2">Is my identity really kept secret?</h4>
//                   <p className="text-gray-400 text-sm">Yes. If you choose 'Anonymous Reporting', we do not store your name or contact details. Only the incident details are forwarded to the police.</p>
//                 </div>
//                 <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
//                   <h4 className="font-bold text-white mb-2">Can I track my complaint status?</h4>
//                   <p className="text-gray-400 text-sm">Absolutely. You will receive a unique tracking ID after submission. You can use this ID on the 'Track Status' page or your dashboard.</p>
//                 </div>
//                 <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
//                   <h4 className="font-bold text-white mb-2">What kind of evidence can I upload?</h4>
//                   <p className="text-gray-400 text-sm">Our system supports Images (JPG, PNG), Videos (MP4), and Audio recordings. Please ensure the files are clear for better investigation.</p>
//                 </div>
//               </div>
//             </div>
//           </section>

//           {/* ================= CTA ================= */}
//           <section className="py-32 text-center bg-gradient-to-t from-black via-black/90 to-transparent">
//             <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">Be a Responsible Citizen.</h2>
//             <p className="text-gray-400 mb-12 text-xl max-w-2xl mx-auto px-4">
//               Your report can save a life or prevent a crime. Join the network of vigilant citizens today.
//             </p>
//             <Link to="/signup" className="px-16 py-6 bg-purple-600 hover:bg-purple-700 rounded-full font-bold text-xl inline-block transition shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:scale-105">
//                Get Started Now
//             </Link>
//           </section>

//           {/* ================= FOOTER ================= */}
//           <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
//             <p>© 2025 CrimeTrack | Government of Maharashtra | All Rights Reserved.</p>
//           </footer>

//           {/* ================= FLOATING CHAT BUTTON (Fixed Icons) ================= */}
//           <div className="fixed bottom-8 right-8 flex items-end z-50 flex-col space-y-3">
//             <TypingChatBubble text="Need Assistance? Ask AI" />
//             <Link to="/legalaid" className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex justify-center items-center shadow-2xl border-2 border-white/20 hover:scale-110 transition group">
//               <FaRobot className="text-2xl text-white group-hover:rotate-12 transition-transform"/>
//             </Link>
//           </div>
//       </div>
//     </div>
//   );
// };

// const TypingChatBubble = ({ text }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(text.slice(0, index + 1));
//       index++;
//       if (index === text.length) clearInterval(interval);
//     }, 80);
//     return () => clearInterval(interval);
//   }, [text]);
//   return (
//     <div className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-2xl rounded-br-none shadow-xl mb-2 font-semibold text-sm animate-fade-in-up self-end mr-2 border border-gray-200">
//       {displayedText}<span className="animate-pulse text-indigo-600">|</span>
//     </div>
//   );
// };

// export default Home;



























// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion"; 
// import axios from "axios";
// import Navbar from "../components/Navbar"; 
// import { 
//   FaShieldAlt, FaUserSecret, FaMapMarkedAlt, FaFileContract, 
//   FaQuestionCircle, FaRobot, FaQuoteLeft, FaStar, FaChevronDown, FaChevronUp
// } from "react-icons/fa";
// import { BASE_URL } from "../config";

// const Home = () => {
//   const [stats, setStats] = useState({ total: 0, resolved: 0, officers: 0 });
//   const [scrolled, setScrolled] = useState(false); 
  
//   // ✅ NEW STATES
//   const [homeData, setHomeData] = useState({ marquee: "", faqs: [], featuredReviews: [] });
//   const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
//   const [openFaqIndex, setOpenFaqIndex] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     // Fetch Stats
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/api/crime/stats`);
//         setStats({
//           total: data.totalComplaints || 0,
//           resolved: data.resolvedCases || 0,
//           officers: data.activeOfficers || 0
//         });
//       } catch (error) { console.error("Stats fetch failed"); }
//     };

//     // ✅ Fetch Home Page Content (Marquee, FAQs, Reviews)
//     const fetchHomeData = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
//             setHomeData(data);
//         } catch (error) { console.error("Home data failed"); }
//     };

//     fetchStats();
//     fetchHomeData();
//     const interval = setInterval(fetchStats, 5000); 
//     return () => clearInterval(interval);
//   }, []);

//   // ✅ Review Rotation Logic
//   useEffect(() => {
//     if (homeData.featuredReviews.length > 1) {
//         const timer = setInterval(() => {
//             setCurrentReviewIndex(prev => (prev + 1) % homeData.featuredReviews.length);
//         }, 5000); // Rotate every 5 seconds
//         return () => clearInterval(timer);
//     }
//   }, [homeData.featuredReviews]);

//   const toggleFaq = (index) => {
//       setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-white">
      
//       {/* BACKGROUND VIDEO LAYER */}
//       <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
//         <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
//           <source src="/Maharashtra_Police_Animation_Video_Generation.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* GRADIENT OVERLAY */}
//       <div className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(10, 15, 30, 0.5), rgba(10, 15, 30, 0.65))` }} />

//       <div className="relative z-10">
//           <Navbar />

//           {/* ✅ 1. DYNAMIC MARQUEE BAR */}
//           <div className="bg-blue-900/90 backdrop-blur-md border-b border-blue-500/30 text-white text-sm md:text-base py-2 overflow-hidden relative z-50 mt-[64px]">
//              <div className="whitespace-nowrap animate-marquee flex items-center">
//                 <span className="mx-4 font-bold text-cyan-400">📢 NOTICE:</span>
//                 <span className="mr-20">{homeData.marquee || "Welcome to the Official Crime Reporting Portal. Please report incidents responsibly. Emergency Dial 112."}</span>
//                 <span className="mx-4 font-bold text-cyan-400">📢 NOTICE:</span>
//                 <span className="mr-20">{homeData.marquee || "Welcome to the Official Crime Reporting Portal. Please report incidents responsibly. Emergency Dial 112."}</span>
//              </div>
//           </div>

//           {/* HERO SECTION */}
//           <section className="relative flex flex-col md:flex-row justify-between items-center min-h-[90vh] px-6 md:px-12 pt-10 gap-6">
            
//             {/* Left: Logo */}
//             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-2 md:order-1">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500 group">
//                 <div className="flex justify-center mb-4 h-40 relative w-full">
//                     {!scrolled && (
//                         <motion.img layoutId="crimetrack-logo-morph" src="/CrimeTrack.png" alt="Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-70 object-contain drop-shadow-2xl" />
//                     )}
//                 </div>
//                 <p className="text-cyan-400 text-lg font-bold tracking-wide">CrimeTrack</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">System Integrated</div>
//               </div>
//             </motion.div>

//             {/* Center Content */}
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="md:w-2/4 flex flex-col items-center text-center space-y-6 z-20 order-1 md:order-2">
//                <div className="inline-block px-5 py-2 border border-cyan-500/40 rounded-full bg-cyan-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default">
//                   <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
//                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Official Crime Reporting Portal
//                   </span>
//                </div>

//                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
//                  Stay Vigilant. <br />
//                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Report Crimes.</span>
//                </h1>

//                <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed drop-shadow-md">
//                  Empowering citizens with a secure, anonymous, and real-time crime reporting platform. Justice is just a click away.
//                </p>

//                {/* ✅ 2. ROTATING REVIEW CAROUSEL */}
//                {homeData.featuredReviews.length > 0 && (
//                    <div className="w-full max-w-lg h-32 md:h-28 relative mt-4">
//                        <AnimatePresence mode="wait">
//                            <motion.div
//                                key={currentReviewIndex}
//                                initial={{ opacity: 0, y: 20 }}
//                                animate={{ opacity: 1, y: 0 }}
//                                exit={{ opacity: 0, y: -20 }}
//                                transition={{ duration: 0.5 }}
//                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 shadow-xl"
//                            >
//                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-cyan-500/50 shrink-0">
//                                    <img src={homeData.featuredReviews[currentReviewIndex].user?.idPhoto || "https://placehold.co/100"} className="w-full h-full object-cover" />
//                                </div>
//                                <div className="text-left flex-1 min-w-0">
//                                    <div className="flex justify-between items-center mb-1">
//                                        <h4 className="font-bold text-white text-sm truncate">{homeData.featuredReviews[currentReviewIndex].user?.firstName}</h4>
//                                        <div className="flex text-yellow-400 text-[10px]">
//                                            {[...Array(homeData.featuredReviews[currentReviewIndex].rating)].map((_,i)=><FaStar key={i}/>)}
//                                        </div>
//                                    </div>
//                                    <p className="text-gray-300 text-xs md:text-sm italic line-clamp-2">"{homeData.featuredReviews[currentReviewIndex].comment}"</p>
//                                </div>
//                            </motion.div>
//                        </AnimatePresence>
//                    </div>
//                )}

//                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
//                  <Link to="/signup" className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transition-all transform hover:-translate-y-1">
//                    <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12"></div>
//                    <span className="relative font-bold text-base flex items-center justify-center gap-2">Report Now</span>
//                  </Link>
                 
//                  <Link to="/legalaid" className="group px-8 py-3 bg-gray-800/60 border border-gray-600 hover:border-gray-400 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:bg-gray-700/80 font-bold text-base flex items-center justify-center gap-2 shadow-lg">
//                    Legal Aid
//                  </Link>
//                </div>
//             </motion.div>

//             {/* Right: Police Logo */}
//             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-3">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500">
//                 <div className="flex justify-center mb-4 h-40 relative">
//                     <img src="/Chandrapur_Police.png" alt="Police" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 w-50 object-contain drop-shadow-2xl" />
//                 </div>
//                 <p className="text-white text-lg font-bold tracking-wide">Maharashtra Police</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">Protect & Serve</div>
//               </div>
//             </motion.div>
//           </section>

//           {/* FEATURES SECTION */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
//             <div className="max-w-7xl mx-auto">
//               <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Use CrimeTrack?</h2>
//                 <p className="text-gray-400 max-w-2xl mx-auto">Our platform is designed with advanced technology to ensure your reports are handled securely, quickly, and effectively.</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {[
//                   { icon: <FaUserSecret className="text-4xl text-purple-400"/>, title: "100% Anonymous", desc: "Report crimes without revealing your identity. Your privacy is protected by end-to-end encryption." },
//                   { icon: <FaMapMarkedAlt className="text-4xl text-blue-400"/>, title: "Geo-Tagging", desc: "Automatically pinpoints the exact location of the incident for faster police response." },
//                   { icon: <FaFileContract className="text-4xl text-green-400"/>, title: "Digital FIR", desc: "Download digitally signed FIR/NCR copies instantly after police verification." },
//                   { icon: <FaShieldAlt className="text-4xl text-red-400"/>, title: "Secure Evidence", desc: "Upload photos, videos, and audio evidence directly to the secure police server." }
//                 ].map((feature, index) => (
//                   <div key={index} className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-2 shadow-lg">
//                     <div className="mb-6 bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">{feature.icon}</div>
//                     <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                     <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* STATS SECTION */}
//           <section className="relative py-24 px-6 md:px-24">
//              <h2 className="text-4xl font-bold mb-16 text-center text-white">Real-Time Impact</h2>
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-7xl mx-auto">
//                {[
//                  { val: stats.total, label: "Complaints Filed", color: "text-blue-400", border: "hover:border-blue-500" },
//                  { val: stats.resolved, label: "Cases Resolved", color: "text-green-400", border: "hover:border-green-500" },
//                  { val: stats.officers, label: "Active Officers", color: "text-purple-400", border: "hover:border-purple-500" }
//                ].map((item, idx) => (
//                  <motion.div 
//                    key={idx}
//                    whileHover={{ y: -10 }}
//                    className={`p-8 bg-gray-900/80 rounded-2xl backdrop-blur-md border border-gray-700 ${item.border} transition-all duration-300 shadow-xl`}
//                  >
//                    <div className={`text-6xl font-black ${item.color} mb-3 drop-shadow-lg`}>{item.val}</div>
//                    <p className="text-gray-400 text-lg uppercase tracking-wider font-bold">{item.label}</p>
//                  </motion.div>
//                ))}
//              </div>
//           </section>

//           {/* ✅ 3. DYNAMIC ACCORDION FAQ SECTION */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/30">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold text-center text-white mb-12 flex items-center justify-center gap-3">
//                 <FaQuestionCircle className="text-gray-500"/> Frequently Asked Questions
//               </h2>
              
//               <div className="grid gap-4">
//                 {homeData.faqs.length > 0 ? homeData.faqs.map((faq, index) => (
//                     <div 
//                         key={index} 
//                         className={`bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'hover:border-gray-600'}`}
//                     >
//                         <button 
//                             onClick={() => toggleFaq(index)}
//                             className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
//                         >
//                             <span className="font-bold text-white text-lg">{faq.question}</span>
//                             {openFaqIndex === index ? <FaChevronUp className="text-cyan-400"/> : <FaChevronDown className="text-gray-500"/>}
//                         </button>
                        
//                         <div 
//                             className={`px-6 text-gray-400 text-sm leading-relaxed transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
//                         >
//                             {faq.answer}
//                         </div>
//                     </div>
//                 )) : (
//                     <p className="text-center text-gray-500">No FAQs available at the moment.</p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* FOOTER */}
//           <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
//             <p>© 2025 CrimeTrack | Government of Maharashtra | All Rights Reserved.</p>
//           </footer>

//           {/* FLOATING CHAT BUTTON */}
//           <div className="fixed bottom-8 right-8 flex items-end z-50 flex-col space-y-3">
//             <TypingChatBubble text="Need Assistance? Ask AI" />
//             <Link to="/legalaid" className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex justify-center items-center shadow-2xl border-2 border-white/20 hover:scale-110 transition group">
//               <FaRobot className="text-2xl text-white group-hover:rotate-12 transition-transform"/>
//             </Link>
//           </div>
//       </div>
//     </div>
//   );
// };

// const TypingChatBubble = ({ text }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(text.slice(0, index + 1));
//       index++;
//       if (index === text.length) clearInterval(interval);
//     }, 80);
//     return () => clearInterval(interval);
//   }, [text]);
//   return (
//     <div className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-2xl rounded-br-none shadow-xl mb-2 font-semibold text-sm animate-fade-in-up self-end mr-2 border border-gray-200">
//       {displayedText}<span className="animate-pulse text-indigo-600">|</span>
//     </div>
//   );
// };

// export default Home;







// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion"; 
// import axios from "axios";
// import Navbar from "../components/Navbar"; 
// import { 
//   FaShieldAlt, FaUserSecret, FaMapMarkedAlt, FaFileContract, 
//   FaQuestionCircle, FaRobot, FaStar, FaChevronDown, FaChevronUp, FaQuoteLeft
// } from "react-icons/fa";
// import { BASE_URL } from "../config";

// const Home = () => {
//   const [stats, setStats] = useState({ total: 0, resolved: 0, officers: 0 });
//   const [scrolled, setScrolled] = useState(false); 
  
//   const [homeData, setHomeData] = useState({ marquee: "", faqs: [], featuredReviews: [] });
//   const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
//   const [openFaqIndex, setOpenFaqIndex] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/api/crime/stats`);
//         setStats({
//           total: data.totalComplaints || 0,
//           resolved: data.resolvedCases || 0,
//           officers: data.activeOfficers || 0
//         });
//       } catch (error) { console.error("Stats fetch failed"); }
//     };

//     const fetchHomeData = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
//             setHomeData(data);
//         } catch (error) { console.error("Home data failed"); }
//     };

//     fetchStats();
//     fetchHomeData();
//     const interval = setInterval(fetchStats, 5000); 
//     return () => clearInterval(interval);
//   }, []);

//   // Review Rotation Logic
//   useEffect(() => {
//     if (homeData.featuredReviews.length > 1) {
//         const timer = setInterval(() => {
//             setCurrentReviewIndex(prev => (prev + 1) % homeData.featuredReviews.length);
//         }, 5000); 
//         return () => clearInterval(timer);
//     }
//   }, [homeData.featuredReviews]);

//   const toggleFaq = (index) => {
//       setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-white">
      
//       {/* CSS for Marquee Animation */}
//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-marquee {
//           display: inline-block;
//           white-space: nowrap;
//           animation: marquee 20s linear infinite;
//         }
//         .marquee-container:hover .animate-marquee {
//           animation-play-state: paused;
//         }
//       `}</style>

//       {/* BACKGROUND VIDEO LAYER */}
//       <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
//         <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
//           <source src="/Maharashtra_Police_Animation_Video_Generation.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* GRADIENT OVERLAY */}
//       <div className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(10, 15, 30, 0.5), rgba(10, 15, 30, 0.65))` }} />

//       <div className="relative z-10">
//           <Navbar />

//           {/* ✅ 1. MARQUEE SECTION (Moved slightly down) */}
//           <div className="fixed top-[70px] w-full z-40">
//              <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 border-y border-cyan-500/30 text-white text-sm md:text-base py-3 overflow-hidden shadow-lg marquee-container">
//                 <div className="animate-marquee flex items-center">
//                     <span className="mx-4 font-bold text-cyan-400 bg-cyan-900/30 px-2 py-0.5 rounded border border-cyan-500/50">📢 OFFICIAL ALERT:</span>
//                     <span className="mr-20 font-medium tracking-wide">{homeData.marquee || "Welcome to the Official Crime Reporting Portal. Please report incidents responsibly. Emergency Dial 112."}</span>
                    
//                     <span className="mx-4 font-bold text-red-400 bg-red-900/30 px-2 py-0.5 rounded border border-red-500/50">🚨 HELP LINE:</span>
//                     <span className="mr-20 font-medium tracking-wide">For immediate emergency assistance, please call 100 or 112 directly. Do not rely solely on web reports for life-threatening situations.</span>
//                 </div>
//              </div>
//           </div>

//           {/* HERO SECTION */}
//           <section className="relative flex flex-col md:flex-row justify-between items-center min-h-[85vh] px-6 md:px-12 pt-32 gap-6">
            
//             {/* Left: Logo */}
//             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-2 md:order-1">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500 group">
//                 <div className="flex justify-center mb-4 h-40 relative w-full">
//                     {!scrolled && (
//                         <motion.img layoutId="crimetrack-logo-morph" src="/CrimeTrack.png" alt="Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-70 object-contain drop-shadow-2xl" />
//                     )}
//                 </div>
//                 <p className="text-cyan-400 text-lg font-bold tracking-wide">CrimeTrack</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">System Integrated</div>
//               </div>
//             </motion.div>

//             {/* Center Content */}
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="md:w-2/4 flex flex-col items-center text-center space-y-6 z-20 order-1 md:order-2">
//                <div className="inline-block px-5 py-2 border border-cyan-500/40 rounded-full bg-cyan-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default">
//                   <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
//                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Official Crime Reporting Portal
//                   </span>
//                </div>

//                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
//                  Stay Vigilant. <br />
//                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Report Crimes.</span>
//                </h1>

//                <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed drop-shadow-md">
//                  Empowering citizens with a secure, anonymous, and real-time crime reporting platform. Justice is just a click away.
//                </p>

//                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
//                  <Link to="/signup" className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transition-all transform hover:-translate-y-1">
//                    <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12"></div>
//                    <span className="relative font-bold text-base flex items-center justify-center gap-2">Report Now</span>
//                  </Link>
                 
//                  <Link to="/legalaid" className="group px-8 py-3 bg-gray-800/60 border border-gray-600 hover:border-gray-400 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:bg-gray-700/80 font-bold text-base flex items-center justify-center gap-2 shadow-lg">
//                    Legal Aid
//                  </Link>
//                </div>
//             </motion.div>

//             {/* Right: Police Logo */}
//             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-3">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500">
//                 <div className="flex justify-center mb-4 h-40 relative">
//                     <img src="/Chandrapur_Police.png" alt="Police" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 w-50 object-contain drop-shadow-2xl" />
//                 </div>
//                 <p className="text-white text-lg font-bold tracking-wide">Maharashtra Police</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">Protect & Serve</div>
//               </div>
//             </motion.div>
//           </section>

//           {/* ✅ 2. PUBLIC REVIEWS SECTION (Moved Above Features) */}
//           {homeData.featuredReviews.length > 0 && (
//             <section className="py-12 px-4 flex justify-center bg-gray-900/40 backdrop-blur-sm border-t border-gray-800">
//                 <div className="w-full max-w-4xl relative">
//                     <div className="text-center mb-6">
//                         <span className="text-xs font-bold text-purple-400 tracking-widest uppercase">Citizen Feedback</span>
//                         <h2 className="text-2xl font-bold text-white mt-1">What People Say</h2>
//                     </div>

//                     <div className="relative h-40 md:h-32 flex justify-center items-center">
//                         <AnimatePresence mode="wait">
//                             <motion.div
//                                 key={currentReviewIndex}
//                                 initial={{ opacity: 0, scale: 0.9 }}
//                                 animate={{ opacity: 1, scale: 1 }}
//                                 exit={{ opacity: 0, scale: 0.9 }}
//                                 transition={{ duration: 0.5 }}
//                                 className="bg-slate-800/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl max-w-2xl w-full"
//                             >
//                                 <div className="relative">
//                                     <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500/50 shadow-lg">
//                                         <img src={homeData.featuredReviews[currentReviewIndex].user?.idPhoto || "https://placehold.co/100"} className="w-full h-full object-cover" alt="User" />
//                                     </div>
//                                     <div className="absolute -bottom-2 -right-2 bg-slate-900 rounded-full p-1 border border-slate-700">
//                                         <FaQuoteLeft className="text-purple-400 text-xs" />
//                                     </div>
//                                 </div>
                                
//                                 <div className="text-center md:text-left flex-1">
//                                     <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
//                                         <h4 className="font-bold text-white text-lg">{homeData.featuredReviews[currentReviewIndex].user?.title} {homeData.featuredReviews[currentReviewIndex].user?.firstName}</h4>
//                                         <div className="flex justify-center md:justify-start text-yellow-400 text-sm gap-1 mt-1 md:mt-0">
//                                             {[...Array(homeData.featuredReviews[currentReviewIndex].rating)].map((_,i)=><FaStar key={i}/>)}
//                                         </div>
//                                     </div>
//                                     <p className="text-gray-300 text-sm italic leading-relaxed">"{homeData.featuredReviews[currentReviewIndex].comment}"</p>
//                                 </div>
//                             </motion.div>
//                         </AnimatePresence>
//                     </div>
//                 </div>
//             </section>
//           )}

//           {/* FEATURES SECTION */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
//             <div className="max-w-7xl mx-auto">
//               <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Use CrimeTrack?</h2>
//                 <p className="text-gray-400 max-w-2xl mx-auto">Our platform is designed with advanced technology to ensure your reports are handled securely, quickly, and effectively.</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {[
//                   { icon: <FaUserSecret className="text-4xl text-purple-400"/>, title: "100% Anonymous", desc: "Report crimes without revealing your identity. Your privacy is protected by end-to-end encryption." },
//                   { icon: <FaMapMarkedAlt className="text-4xl text-blue-400"/>, title: "Geo-Tagging", desc: "Automatically pinpoints the exact location of the incident for faster police response." },
//                   { icon: <FaFileContract className="text-4xl text-green-400"/>, title: "Digital FIR", desc: "Download digitally signed FIR/NCR copies instantly after police verification." },
//                   { icon: <FaShieldAlt className="text-4xl text-red-400"/>, title: "Secure Evidence", desc: "Upload photos, videos, and audio evidence directly to the secure police server." }
//                 ].map((feature, index) => (
//                   <div key={index} className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-2 shadow-lg">
//                     <div className="mb-6 bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">{feature.icon}</div>
//                     <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                     <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* STATS SECTION */}
//           <section className="relative py-24 px-6 md:px-24">
//              <h2 className="text-4xl font-bold mb-16 text-center text-white">Real-Time Impact</h2>
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-7xl mx-auto">
//                {[
//                  { val: stats.total, label: "Complaints Filed", color: "text-blue-400", border: "hover:border-blue-500" },
//                  { val: stats.resolved, label: "Cases Resolved", color: "text-green-400", border: "hover:border-green-500" },
//                  { val: stats.officers, label: "Active Officers", color: "text-purple-400", border: "hover:border-purple-500" }
//                ].map((item, idx) => (
//                  <motion.div 
//                    key={idx}
//                    whileHover={{ y: -10 }}
//                    className={`p-8 bg-gray-900/80 rounded-2xl backdrop-blur-md border border-gray-700 ${item.border} transition-all duration-300 shadow-xl`}
//                  >
//                    <div className={`text-6xl font-black ${item.color} mb-3 drop-shadow-lg`}>{item.val}</div>
//                    <p className="text-gray-400 text-lg uppercase tracking-wider font-bold">{item.label}</p>
//                  </motion.div>
//                ))}
//              </div>
//           </section>

//           {/* ✅ 3. DYNAMIC ACCORDION FAQ SECTION */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/30">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold text-center text-white mb-12 flex items-center justify-center gap-3">
//                 <FaQuestionCircle className="text-gray-500"/> Frequently Asked Questions
//               </h2>
              
//               <div className="grid gap-4">
//                 {homeData.faqs.length > 0 ? homeData.faqs.map((faq, index) => (
//                     <div 
//                         key={index} 
//                         className={`bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'hover:border-gray-600'}`}
//                     >
//                         <button 
//                             onClick={() => toggleFaq(index)}
//                             className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
//                         >
//                             <span className="font-bold text-white text-lg">{faq.question}</span>
//                             {openFaqIndex === index ? <FaChevronUp className="text-cyan-400"/> : <FaChevronDown className="text-gray-500"/>}
//                         </button>
                        
//                         <div 
//                             className={`px-6 text-gray-400 text-sm leading-relaxed transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
//                         >
//                             {faq.answer}
//                         </div>
//                     </div>
//                 )) : (
//                     <p className="text-center text-gray-500">No FAQs available at the moment.</p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* FOOTER */}
//           <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
//             <p>© 2025 CrimeTrack | Government of Maharashtra | All Rights Reserved.</p>
//           </footer>

//           {/* FLOATING CHAT BUTTON */}
//           <div className="fixed bottom-8 right-8 flex items-end z-50 flex-col space-y-3">
//             <TypingChatBubble text="Need Assistance? Ask AI" />
//             <Link to="/legalaid" className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex justify-center items-center shadow-2xl border-2 border-white/20 hover:scale-110 transition group">
//               <FaRobot className="text-2xl text-white group-hover:rotate-12 transition-transform"/>
//             </Link>
//           </div>
//       </div>
//     </div>
//   );
// };

// const TypingChatBubble = ({ text }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(text.slice(0, index + 1));
//       index++;
//       if (index === text.length) clearInterval(interval);
//     }, 80);
//     return () => clearInterval(interval);
//   }, [text]);
//   return (
//     <div className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-2xl rounded-br-none shadow-xl mb-2 font-semibold text-sm animate-fade-in-up self-end mr-2 border border-gray-200">
//       {displayedText}<span className="animate-pulse text-indigo-600">|</span>
//     </div>
//   );
// };

// export default Home;





// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion"; 
// import axios from "axios";
// import Navbar from "../components/Navbar"; 
// import { 
//   FaShieldAlt, FaUserSecret, FaMapMarkedAlt, FaFileContract, 
//   FaQuestionCircle, FaRobot, FaStar, FaChevronDown, FaChevronUp, FaQuoteLeft
// } from "react-icons/fa";
// import { BASE_URL } from "../config";

// const Home = () => {
//   const [stats, setStats] = useState({ total: 0, resolved: 0, officers: 0 });
//   const [scrolled, setScrolled] = useState(false); 
//   const [homeData, setHomeData] = useState({ marquee: "", faqs: [], featuredReviews: [] });
//   const [openFaqIndex, setOpenFaqIndex] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/api/crime/stats`);
//         setStats({
//           total: data.totalComplaints || 0,
//           resolved: data.resolvedCases || 0,
//           officers: data.activeOfficers || 0
//         });
//       } catch (error) { console.error("Stats fetch failed"); }
//     };

//     const fetchHomeData = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
//             setHomeData(data);
//         } catch (error) { console.error("Home data failed"); }
//     };

//     fetchStats();
//     fetchHomeData();
//     const interval = setInterval(fetchStats, 5000); 
//     return () => clearInterval(interval);
//   }, []);

//   const toggleFaq = (index) => {
//       setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-white">
      
//       {/* CSS for Animations */}
//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-marquee {
//           display: inline-block;
//           white-space: nowrap;
//           animation: marquee 25s linear infinite;
//         }
        
//         /* Shine Effect Animation */
//         @keyframes shine-move {
//           0% { left: -100%; opacity: 0; }
//           50% { opacity: 0.5; }
//           100% { left: 200%; opacity: 0; }
//         }
//         .animate-shine-effect {
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 50%;
//           height: 100%;
//           background: linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent);
//           transform: skewX(-20deg);
//           animation: shine-move 3s infinite;
//         }
//       `}</style>

//       {/* BACKGROUND VIDEO LAYER */}
//       <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
//         <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
//           <source src="/Maharashtra_Police_Animation_Video_Generation.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* GRADIENT OVERLAY */}
//       <div className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(10, 15, 30, 0.6), rgba(10, 15, 30, 0.8))` }} />

//       <div className="relative z-10">
//           <Navbar />

//           {/* ✅ 1. OFFICIAL MARQUEE SECTION */}
//           {/* Adjusted 'top' to prevent overlap with logo background on mobile */}
//           <div className="fixed top-[64px] md:top-[74px] w-full z-30"> 
//              <div className="bg-slate-950 border-b border-red-900/50 text-white text-xs md:text-sm py-2 overflow-hidden shadow-2xl relative">
//                 <div className="absolute inset-0 bg-red-900/10 pointer-events-none"></div> {/* Red Tint for Official Alert feel */}
//                 <div className="animate-marquee flex items-center">
//                     <span className="mx-4 font-black text-red-500 bg-red-950/50 px-2 py-0.5 rounded border border-red-800 text-[10px] md:text-xs tracking-widest">OFFICIAL ALERT:</span>
//                     <span className="mr-20 font-mono tracking-wide text-gray-200">{homeData.marquee || "Welcome to the Official Crime Reporting Portal. Please report incidents responsibly."}</span>
                    
//                     <span className="mx-4 font-black text-yellow-500 bg-yellow-950/50 px-2 py-0.5 rounded border border-yellow-800 text-[10px] md:text-xs tracking-widest">HELPLINE:</span>
//                     <span className="mr-20 font-mono tracking-wide text-gray-200">Emergency? Dial 112 immediately. Do not rely solely on web reports for life-threatening situations.</span>
//                 </div>
//              </div>
//           </div>

//           {/* HERO SECTION */}
//           <section className="relative flex flex-col md:flex-row justify-between items-center min-h-[80vh] px-6 md:px-12 pt-32 md:pt-40 gap-6">
            
//             {/* Left: Logo */}
//             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-2 md:order-1">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-4 md:p-6 rounded-[2rem] shadow-2xl w-[200px] md:w-[280px] text-center hover:scale-105 transition-transform duration-500 group">
//                 <div className="flex justify-center mb-4 h-28 md:h-40 relative w-full">
//                     {!scrolled && (
//                         <motion.img layoutId="crimetrack-logo-morph" src="/CrimeTrack.png" alt="Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 md:h-60 w-auto object-contain drop-shadow-2xl" />
//                     )}
//                 </div>
//                 <p className="text-cyan-400 text-base md:text-lg font-bold tracking-wide">CrimeTrack</p>
//                 <div className="mt-2 md:mt-4 text-[10px] md:text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">System Integrated</div>
//               </div>
//             </motion.div>

//             {/* Center Content */}
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="md:w-2/4 flex flex-col items-center text-center space-y-4 md:space-y-6 z-20 order-1 md:order-2">
//                <div className="inline-block px-3 py-1.5 md:px-5 md:py-2 border border-cyan-500/40 rounded-full bg-cyan-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default">
//                   <span className="text-cyan-400 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2">
//                      <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-cyan-400 animate-pulse"></span> Official Reporting Portal
//                   </span>
//                </div>

//                <h1 className="text-3xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
//                  Stay Vigilant. <br />
//                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Report Crimes.</span>
//                </h1>

//                <p className="text-xs md:text-lg text-gray-300 max-w-xl leading-relaxed drop-shadow-md px-4">
//                  Empowering citizens with a secure, anonymous, and real-time crime reporting platform.
//                </p>

//                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full justify-center mt-4 md:mt-6">
//                  <Link to="/signup" className="group relative px-6 py-2.5 md:px-8 md:py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transition-all transform hover:-translate-y-1">
//                    <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12"></div>
//                    <span className="relative font-bold text-sm md:text-base flex items-center justify-center gap-2">Report Now</span>
//                  </Link>
                 
//                  <Link to="/legalaid" className="group px-6 py-2.5 md:px-8 md:py-3 bg-gray-800/60 border border-gray-600 hover:border-gray-400 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:bg-gray-700/80 font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg">
//                    Legal Aid
//                  </Link>
//                </div>
//             </motion.div>

//             {/* Right: Police Logo */}
//             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-3">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-4 md:p-6 rounded-[2rem] shadow-2xl w-[200px] md:w-[280px] text-center hover:scale-105 transition-transform duration-500">
//                 <div className="flex justify-center mb-4 h-28 md:h-40 relative">
//                     <img src="/Chandrapur_Police.png" alt="Police" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-36 w-36 md:h-50 md:w-50 object-contain drop-shadow-2xl" />
//                 </div>
//                 <p className="text-white text-sm md:text-lg font-bold tracking-wide">Maharashtra Police</p>
//                 <div className="mt-2 md:mt-4 text-[10px] md:text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">Protect & Serve</div>
//               </div>
//             </motion.div>
//           </section>

//           {/* ✅ 2. WANDERING REVIEWS SECTION (Tiny & Floating) */}
//           {homeData.featuredReviews.length > 0 && (
//             <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-gray-950/30 border-y border-gray-800">
//                 {/* Section Title Background */}
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <h2 className="text-4xl md:text-6xl font-black text-white/5 uppercase tracking-widest">Public Voice</h2>
//                 </div>

//                 {/* Floating Cards Container */}
//                 <div className="absolute inset-0 w-full h-full">
//                     {homeData.featuredReviews.slice(0, 5).map((review, index) => {
//                         // Generate random starting positions
//                         const randomTop = Math.floor(Math.random() * 60) + 10; // 10% to 70% top
//                         const randomLeft = Math.floor(Math.random() * 70) + 5; // 5% to 75% left
//                         const delay = index * 2;

//                         return (
//                             <motion.div
//                                 key={review._id}
//                                 drag // ✅ Click/Touch to Hold
//                                 dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Elastic hold
//                                 animate={{
//                                     x: [0, 50, -50, 30, -30, 0],
//                                     y: [0, -30, 20, -20, 10, 0],
//                                 }}
//                                 transition={{
//                                     duration: 15 + index * 2, // Varied speeds
//                                     repeat: Infinity,
//                                     repeatType: "mirror",
//                                     ease: "easeInOut",
//                                     delay: delay
//                                 }}
//                                 style={{ top: `${randomTop}%`, left: `${randomLeft}%` }}
//                                 className="absolute cursor-pointer z-20"
//                             >
//                                 {/* ✅ MICRO CARD UI */}
//                                 <div className="
//                                     w-48 md:w-72 
//                                     bg-slate-900/80 backdrop-blur-md 
//                                     border border-cyan-500/30 
//                                     rounded-xl p-3 md:p-4 
//                                     shadow-[0_0_15px_rgba(6,182,212,0.15)] 
//                                     flex flex-col gap-2 
//                                     hover:scale-110 hover:z-50 hover:border-cyan-400
//                                     transition-all duration-300
//                                     group relative overflow-hidden
//                                 ">
//                                     {/* Shine Overlay */}
//                                     <div className="animate-shine-effect pointer-events-none"></div>

//                                     <div className="flex items-center gap-2 md:gap-3">
//                                         <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-cyan-400 p-0.5 shrink-0">
//                                             <img src={review.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full rounded-full object-cover" alt="User" />
//                                         </div>
//                                         <div className="min-w-0">
//                                             <h4 className="text-[10px] md:text-sm font-bold text-white truncate">
//                                                 {review.user?.firstName} {review.user?.lastName}
//                                             </h4>
//                                             <span className={`text-[8px] md:text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-black/40 ${review.user?.role === 'citizen' ? 'text-cyan-400' : 'text-yellow-400'}`}>
//                                                 {review.user?.role === 'citizen' ? 'Citizen' : review.user?.designation || 'Officer'}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <p className="text-[9px] md:text-xs text-gray-300 italic line-clamp-2 leading-tight">
//                                         "{review.comment}"
//                                     </p>

//                                     <div className="flex text-yellow-400 text-[8px] md:text-[10px] gap-0.5">
//                                         {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         );
//                     })}
//                 </div>
//             </section>
//           )}

//           {/* FEATURES SECTION */}
//           <section className="py-16 md:py-24 px-6 md:px-24 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
//             <div className="max-w-7xl mx-auto">
//               <div className="text-center mb-10 md:mb-16">
//                 <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Why Use CrimeTrack?</h2>
//                 <p className="text-xs md:text-base text-gray-400 max-w-2xl mx-auto">Our platform is designed with advanced technology to ensure your reports are handled securely.</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
//                 {[
//                   { icon: <FaUserSecret className="text-3xl md:text-4xl text-purple-400"/>, title: "100% Anonymous", desc: "Report crimes without revealing your identity." },
//                   { icon: <FaMapMarkedAlt className="text-3xl md:text-4xl text-blue-400"/>, title: "Geo-Tagging", desc: "Automatically pinpoints the exact location of the incident." },
//                   { icon: <FaFileContract className="text-3xl md:text-4xl text-green-400"/>, title: "Digital FIR", desc: "Download digitally signed FIR/NCR copies instantly." },
//                   { icon: <FaShieldAlt className="text-3xl md:text-4xl text-red-400"/>, title: "Secure Evidence", desc: "Upload photos, videos, and audio evidence directly." }
//                 ].map((feature, index) => (
//                   <div key={index} className="bg-gray-800/40 p-6 md:p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-2 shadow-lg">
//                     <div className="mb-4 md:mb-6 bg-gray-900 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-inner">{feature.icon}</div>
//                     <h3 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3">{feature.title}</h3>
//                     <p className="text-xs md:text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* STATS SECTION */}
//           <section className="relative py-16 md:py-24 px-6 md:px-24">
//              <h2 className="text-2xl md:text-4xl font-bold mb-10 md:mb-16 text-center text-white">Real-Time Impact</h2>
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center max-w-7xl mx-auto">
//                {[
//                  { val: stats.total, label: "Complaints Filed", color: "text-blue-400", border: "hover:border-blue-500" },
//                  { val: stats.resolved, label: "Cases Resolved", color: "text-green-400", border: "hover:border-green-500" },
//                  { val: stats.officers, label: "Active Officers", color: "text-purple-400", border: "hover:border-purple-500" }
//                ].map((item, idx) => (
//                  <motion.div 
//                    key={idx}
//                    whileHover={{ y: -10 }}
//                    className={`p-6 md:p-8 bg-gray-900/80 rounded-2xl backdrop-blur-md border border-gray-700 ${item.border} transition-all duration-300 shadow-xl`}
//                  >
//                    <div className={`text-4xl md:text-6xl font-black ${item.color} mb-2 md:mb-3 drop-shadow-lg`}>{item.val}</div>
//                    <p className="text-gray-400 text-sm md:text-lg uppercase tracking-wider font-bold">{item.label}</p>
//                  </motion.div>
//                ))}
//              </div>
//           </section>

//           {/* FAQ SECTION */}
//           <section className="py-16 md:py-24 px-6 md:px-24 bg-gray-900/30">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-2xl md:text-3xl font-bold text-center text-white mb-10 md:mb-12 flex items-center justify-center gap-3">
//                 <FaQuestionCircle className="text-gray-500"/> Frequently Asked Questions
//               </h2>
              
//               <div className="grid gap-3 md:gap-4">
//                 {homeData.faqs.length > 0 ? homeData.faqs.map((faq, index) => (
//                     <div 
//                         key={index} 
//                         className={`bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'hover:border-gray-600'}`}
//                     >
//                         <button 
//                             onClick={() => toggleFaq(index)}
//                             className="w-full text-left p-4 md:p-6 flex justify-between items-center focus:outline-none"
//                         >
//                             <span className="font-bold text-white text-sm md:text-lg">{faq.question}</span>
//                             {openFaqIndex === index ? <FaChevronUp className="text-cyan-400"/> : <FaChevronDown className="text-gray-500"/>}
//                         </button>
                        
//                         <div 
//                             className={`px-4 md:px-6 text-gray-400 text-xs md:text-sm leading-relaxed transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 pb-4 md:pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
//                         >
//                             {faq.answer}
//                         </div>
//                     </div>
//                 )) : (
//                     <p className="text-center text-gray-500">No FAQs available.</p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* FOOTER */}
//           <footer className="py-6 md:py-8 text-center text-gray-600 text-xs md:text-sm bg-black border-t border-gray-900">
//             <p>© 2025 CrimeTrack | Government of Maharashtra | All Rights Reserved.</p>
//           </footer>

//           {/* FLOATING CHAT */}
//           <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 flex items-end z-50 flex-col space-y-2 md:space-y-3">
//             <TypingChatBubble text="Need Assistance? Ask AI" />
//             <Link to="/legalaid" className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex justify-center items-center shadow-2xl border-2 border-white/20 hover:scale-110 transition group">
//               <FaRobot className="text-lg md:text-2xl text-white group-hover:rotate-12 transition-transform"/>
//             </Link>
//           </div>
//       </div>
//     </div>
//   );
// };

// const TypingChatBubble = ({ text }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(text.slice(0, index + 1));
//       index++;
//       if (index === text.length) clearInterval(interval);
//     }, 80);
//     return () => clearInterval(interval);
//   }, [text]);
//   return (
//     <div className="bg-white/90 backdrop-blur-md text-gray-900 px-3 py-2 md:px-5 md:py-3 rounded-2xl rounded-br-none shadow-xl mb-1 md:mb-2 font-semibold text-xs md:text-sm animate-fade-in-up self-end mr-1 md:mr-2 border border-gray-200">
//       {displayedText}<span className="animate-pulse text-indigo-600">|</span>
//     </div>
//   );
// };

// export default Home;




















// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion"; 
// import axios from "axios";
// import Navbar from "../components/Navbar"; 
// import { 
//   FaShieldAlt, FaUserSecret, FaMapMarkedAlt, FaFileContract, 
//   FaQuestionCircle, FaRobot, FaStar, FaChevronDown, FaChevronUp, FaQuoteLeft
// } from "react-icons/fa";
// import { BASE_URL } from "../config";

// const Home = () => {
//   const [stats, setStats] = useState({ total: 0, resolved: 0, officers: 0 });
//   const [scrolled, setScrolled] = useState(false); 
  
//   const [homeData, setHomeData] = useState({ marquee: "", faqs: [], featuredReviews: [] });
//   // Removed currentReviewIndex as we now show multiple floating cards
//   const [openFaqIndex, setOpenFaqIndex] = useState(null);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const { data } = await axios.get(`${BASE_URL}/api/crime/stats`);
//         setStats({
//           total: data.totalComplaints || 0,
//           resolved: data.resolvedCases || 0,
//           officers: data.activeOfficers || 0
//         });
//       } catch (error) { console.error("Stats fetch failed"); }
//     };

//     const fetchHomeData = async () => {
//         try {
//             const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
//             setHomeData(data);
//         } catch (error) { console.error("Home data failed"); }
//     };

//     fetchStats();
//     fetchHomeData();
//     const interval = setInterval(fetchStats, 5000); 
//     return () => clearInterval(interval);
//   }, []);

//   const toggleFaq = (index) => {
//       setOpenFaqIndex(openFaqIndex === index ? null : index);
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-white">
      
//       {/* CSS for Animations */}
//       <style>{`
//         @keyframes marquee {
//           0% { transform: translateX(100%); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-marquee {
//           display: inline-block;
//           white-space: nowrap;
//           animation: marquee 25s linear infinite;
//         }
        
//         /* Shine Effect Animation */
//         @keyframes shine-move {
//           0% { left: -100%; opacity: 0; }
//           50% { opacity: 0.5; }
//           100% { left: 200%; opacity: 0; }
//         }
//         .animate-shine-effect {
//           position: absolute;
//           top: 0;
//           left: -100%;
//           width: 50%;
//           height: 100%;
//           background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
//           transform: skewX(-20deg);
//           animation: shine-move 3s infinite;
//         }
//       `}</style>

//       {/* BACKGROUND VIDEO LAYER */}
//       <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
//         <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
//           <source src="/Maharashtra_Police_Animation_Video_Generation.mp4" type="video/mp4" />
//         </video>
//       </div>

//       {/* GRADIENT OVERLAY */}
//       <div className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(10, 15, 30, 0.6), rgba(10, 15, 30, 0.8))` }} />

//       <div className="relative z-10">
//           <Navbar />

//           {/* ✅ 1. OFFICIAL MARQUEE SECTION */}
//           {/* Adjusted Top Position to avoid overlap on mobile (Top: 80px mobile / 74px desktop) */}
//           <div className="fixed top-[80px] md:top-[74px] w-full z-30"> 
//              <div className="bg-slate-950 border-y border-slate-800 text-white text-xs md:text-sm py-2 overflow-hidden shadow-2xl relative">
//                 <div className="absolute inset-0 bg-blue-900/5 pointer-events-none"></div> {/* Subtle official tint */}
//                 <div className="animate-marquee flex items-center">
//                     <span className="mx-4 font-black text-red-500 bg-red-950/30 px-2 py-0.5 rounded border border-red-900 text-[10px] md:text-xs tracking-widest">OFFICIAL ALERT:</span>
//                     <span className="mr-20 font-mono tracking-wide text-gray-300">{homeData.marquee || "Welcome to the Official Crime Reporting Portal. Please report incidents responsibly."}</span>
                    
//                     <span className="mx-4 font-black text-yellow-500 bg-yellow-950/30 px-2 py-0.5 rounded border border-yellow-900 text-[10px] md:text-xs tracking-widest">HELPLINE:</span>
//                     <span className="mr-20 font-mono tracking-wide text-gray-300">Emergency? Dial 112 immediately. Do not rely solely on web reports for life-threatening situations.</span>
//                 </div>
//              </div>
//           </div>

//           {/* HERO SECTION */}
//           <section className="relative flex flex-col md:flex-row justify-between items-center min-h-[85vh] px-6 md:px-12 pt-36 md:pt-40 gap-6">
            
//             {/* Left: Logo */}
//             <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-2 md:order-1">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500 group">
//                 <div className="flex justify-center mb-4 h-40 relative w-full">
//                     {!scrolled && (
//                         <motion.img layoutId="crimetrack-logo-morph" src="/CrimeTrack.png" alt="Logo" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-70 object-contain drop-shadow-2xl" />
//                     )}
//                 </div>
//                 <p className="text-cyan-400 text-lg font-bold tracking-wide">CrimeTrack</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">System Integrated</div>
//               </div>
//             </motion.div>

//             {/* Center Content */}
//             <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="md:w-2/4 flex flex-col items-center text-center space-y-6 z-20 order-1 md:order-2">
//                <div className="inline-block px-5 py-2 border border-cyan-500/40 rounded-full bg-cyan-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default">
//                   <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
//                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Official Crime Reporting Portal
//                   </span>
//                </div>

//                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
//                  Stay Vigilant. <br />
//                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Report Crimes.</span>
//                </h1>

//                <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed drop-shadow-md">
//                  Empowering citizens with a secure, anonymous, and real-time crime reporting platform. Justice is just a click away.
//                </p>

//                <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
//                  <Link to="/signup" className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transition-all transform hover:-translate-y-1">
//                    <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12"></div>
//                    <span className="relative font-bold text-base flex items-center justify-center gap-2">Report Now</span>
//                  </Link>
                 
//                  <Link to="/legalaid" className="group px-8 py-3 bg-gray-800/60 border border-gray-600 hover:border-gray-400 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:bg-gray-700/80 font-bold text-base flex items-center justify-center gap-2 shadow-lg">
//                    Legal Aid
//                  </Link>
//                </div>
//             </motion.div>

//             {/* Right: Police Logo */}
//             <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-3">
//               <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500">
//                 <div className="flex justify-center mb-4 h-40 relative">
//                     <img src="/Chandrapur_Police.png" alt="Police" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 w-50 object-contain drop-shadow-2xl" />
//                 </div>
//                 <p className="text-white text-lg font-bold tracking-wide">Maharashtra Police</p>
//                 <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">Protect & Serve</div>
//               </div>
//             </motion.div>
//           </section>

//           {/* ✅ 2. WANDERING REVIEWS SECTION (Tiny Floating Cards) */}
//           {homeData.featuredReviews.length > 0 && (
//             <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-gray-950/40 border-y border-gray-800">
//                 {/* Background Title */}
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                     <h2 className="text-4xl md:text-6xl font-black text-white/5 uppercase tracking-widest">Public Voice</h2>
//                 </div>

//                 {/* Floating Cards Container */}
//                 <div className="absolute inset-0 w-full h-full">
//                     {/* Render first 6 featured reviews randomly positioned */}
//                     {homeData.featuredReviews.slice(0, 6).map((review, index) => {
//                         // Generate random starting positions spread across the container
//                         const randomTop = Math.floor(Math.random() * 60) + 10; // 10% to 70%
//                         const randomLeft = Math.floor(Math.random() * 80) + 5; // 5% to 85%
//                         const delay = index * 1.5;

//                         return (
//                             <motion.div
//                                 key={review._id}
//                                 drag // ✅ CLICK TO STOP/HOLD
//                                 dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//                                 animate={{
//                                     x: [0, 60, -60, 40, -40, 0], // Wandering X
//                                     y: [0, -40, 30, -30, 20, 0], // Wandering Y
//                                 }}
//                                 transition={{
//                                     duration: 20 + index * 3, // Varied speeds
//                                     repeat: Infinity,
//                                     repeatType: "mirror",
//                                     ease: "easeInOut",
//                                     delay: delay
//                                 }}
//                                 style={{ top: `${randomTop}%`, left: `${randomLeft}%` }}
//                                 className="absolute cursor-pointer z-20"
//                             >
//                                 {/* ✅ MICRO CARD UI (Tiny for Mobile) */}
//                                 <div className="
//                                     w-40 md:w-64 
//                                     bg-slate-900/90 backdrop-blur-lg 
//                                     border border-cyan-500/20 
//                                     rounded-lg p-2 md:p-3 
//                                     shadow-[0_0_20px_rgba(0,0,0,0.5)] 
//                                     flex flex-col gap-1.5 
//                                     hover:scale-110 hover:z-50 hover:border-cyan-400
//                                     transition-all duration-300
//                                     relative overflow-hidden group
//                                 ">
//                                     {/* ✨ Shine Overlay */}
//                                     <div className="animate-shine-effect pointer-events-none"></div>

//                                     <div className="flex items-center gap-2">
//                                         <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-cyan-400 p-0.5 shrink-0 bg-black">
//                                             <img src={review.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full rounded-full object-cover" alt="User" />
//                                         </div>
//                                         <div className="min-w-0">
//                                             <h4 className="text-[9px] md:text-xs font-bold text-white truncate max-w-[80px] md:max-w-[120px]">
//                                                 {review.user?.firstName} {review.user?.lastName}
//                                             </h4>
//                                             {/* Role Badge */}
//                                             <span className={`text-[7px] md:text-[9px] uppercase font-bold tracking-wider px-1 py-0 rounded bg-black/50 border border-slate-700 ${review.user?.role === 'citizen' ? 'text-cyan-400' : 'text-yellow-400'}`}>
//                                                 {review.user?.role === 'citizen' ? 'Citizen' : review.user?.designation || 'Official'}
//                                             </span>
//                                         </div>
//                                     </div>

//                                     <p className="text-[8px] md:text-[10px] text-gray-300 italic line-clamp-2 leading-tight font-medium">
//                                         "{review.comment}"
//                                     </p>

//                                     <div className="flex text-yellow-400 text-[7px] md:text-[9px] gap-0.5">
//                                         {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         );
//                     })}
//                 </div>
//             </section>
//           )}

//           {/* FEATURES SECTION */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/50 backdrop-blur-sm border-t border-gray-800">
//             <div className="max-w-7xl mx-auto">
//               <div className="text-center mb-16">
//                 <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Use CrimeTrack?</h2>
//                 <p className="text-gray-400 max-w-2xl mx-auto">Our platform is designed with advanced technology to ensure your reports are handled securely, quickly, and effectively.</p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {[
//                   { icon: <FaUserSecret className="text-4xl text-purple-400"/>, title: "100% Anonymous", desc: "Report crimes without revealing your identity. Your privacy is protected by end-to-end encryption." },
//                   { icon: <FaMapMarkedAlt className="text-4xl text-blue-400"/>, title: "Geo-Tagging", desc: "Automatically pinpoints the exact location of the incident for faster police response." },
//                   { icon: <FaFileContract className="text-4xl text-green-400"/>, title: "Digital FIR", desc: "Download digitally signed FIR/NCR copies instantly after police verification." },
//                   { icon: <FaShieldAlt className="text-4xl text-red-400"/>, title: "Secure Evidence", desc: "Upload photos, videos, and audio evidence directly to the secure police server." }
//                 ].map((feature, index) => (
//                   <div key={index} className="bg-gray-800/40 p-8 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all hover:-translate-y-2 shadow-lg">
//                     <div className="mb-6 bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center shadow-inner">{feature.icon}</div>
//                     <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
//                     <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </section>

//           {/* STATS SECTION */}
//           <section className="relative py-24 px-6 md:px-24">
//              <h2 className="text-4xl font-bold mb-16 text-center text-white">Real-Time Impact</h2>
//              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-7xl mx-auto">
//                {[
//                  { val: stats.total, label: "Complaints Filed", color: "text-blue-400", border: "hover:border-blue-500" },
//                  { val: stats.resolved, label: "Cases Resolved", color: "text-green-400", border: "hover:border-green-500" },
//                  { val: stats.officers, label: "Active Officers", color: "text-purple-400", border: "hover:border-purple-500" }
//                ].map((item, idx) => (
//                  <motion.div 
//                    key={idx}
//                    whileHover={{ y: -10 }}
//                    className={`p-8 bg-gray-900/80 rounded-2xl backdrop-blur-md border border-gray-700 ${item.border} transition-all duration-300 shadow-xl`}
//                  >
//                    <div className={`text-6xl font-black ${item.color} mb-3 drop-shadow-lg`}>{item.val}</div>
//                    <p className="text-gray-400 text-lg uppercase tracking-wider font-bold">{item.label}</p>
//                  </motion.div>
//                ))}
//              </div>
//           </section>

//           {/* ✅ 3. DYNAMIC ACCORDION FAQ SECTION */}
//           <section className="py-24 px-6 md:px-24 bg-gray-900/30">
//             <div className="max-w-4xl mx-auto">
//               <h2 className="text-3xl font-bold text-center text-white mb-12 flex items-center justify-center gap-3">
//                 <FaQuestionCircle className="text-gray-500"/> Frequently Asked Questions
//               </h2>
              
//               <div className="grid gap-4">
//                 {homeData.faqs.length > 0 ? homeData.faqs.map((faq, index) => (
//                     <div 
//                         key={index} 
//                         className={`bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'hover:border-gray-600'}`}
//                     >
//                         <button 
//                             onClick={() => toggleFaq(index)}
//                             className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
//                         >
//                             <span className="font-bold text-white text-lg">{faq.question}</span>
//                             {openFaqIndex === index ? <FaChevronUp className="text-cyan-400"/> : <FaChevronDown className="text-gray-500"/>}
//                         </button>
                        
//                         <div 
//                             className={`px-6 text-gray-400 text-sm leading-relaxed transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
//                         >
//                             {faq.answer}
//                         </div>
//                     </div>
//                 )) : (
//                     <p className="text-center text-gray-500">No FAQs available at the moment.</p>
//                 )}
//               </div>
//             </div>
//           </section>

//           {/* FOOTER */}
//           <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
//             <p>© 2025 CrimeTrack | Government of Maharashtra | All Rights Reserved.</p>
//           </footer>

//           {/* FLOATING CHAT BUTTON */}
//           <div className="fixed bottom-8 right-8 flex items-end z-50 flex-col space-y-3">
//             <TypingChatBubble text="Need Assistance? Ask AI" />
//             <Link to="/legalaid" className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex justify-center items-center shadow-2xl border-2 border-white/20 hover:scale-110 transition group">
//               <FaRobot className="text-2xl text-white group-hover:rotate-12 transition-transform"/>
//             </Link>
//           </div>
//       </div>
//     </div>
//   );
// };

// const TypingChatBubble = ({ text }) => {
//   const [displayedText, setDisplayedText] = useState("");
//   useEffect(() => {
//     let index = 0;
//     const interval = setInterval(() => {
//       setDisplayedText(text.slice(0, index + 1));
//       index++;
//       if (index === text.length) clearInterval(interval);
//     }, 80);
//     return () => clearInterval(interval);
//   }, [text]);
//   return (
//     <div className="bg-white/90 backdrop-blur-md text-gray-900 px-5 py-3 rounded-2xl rounded-br-none shadow-xl mb-2 font-semibold text-sm animate-fade-in-up self-end mr-2 border border-gray-200">
//       {displayedText}<span className="animate-pulse text-indigo-600">|</span>
//     </div>
//   );
// };

// export default Home;




















































import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; 
import axios from "axios";
import Navbar from "../components/Navbar"; 
import { 
  FaShieldAlt, FaUserSecret, FaMapMarkedAlt, FaFileContract, 
  FaQuestionCircle, FaRobot, FaStar, FaChevronDown, FaChevronUp, FaQuoteLeft
} from "react-icons/fa";
import { BASE_URL } from "../config";

const Home = () => {
  const [stats, setStats] = useState({ total: 0, resolved: 0, officers: 0 });
  const [scrolled, setScrolled] = useState(false); 
  
  const [homeData, setHomeData] = useState({ marquee: "", faqs: [], featuredReviews: [] });
  // Removed currentReviewIndex as we now show multiple floating cards
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Fetch Stats
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/api/crime/stats`);
        setStats({
          total: data.totalComplaints || 0,
          resolved: data.resolvedCases || 0,
          officers: data.activeOfficers || 0
        });
      } catch (error) { console.error("Stats fetch failed"); }
    };

    // Fetch Home Page Content
    const fetchHomeData = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/homepage/public`);
            setHomeData(data);
        } catch (error) { console.error("Home data failed"); }
    };

    fetchStats();
    fetchHomeData();
    const interval = setInterval(fetchStats, 5000); 
    return () => clearInterval(interval);
  }, []);

  const toggleFaq = (index) => {
      setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden font-sans text-white">
      
      {/* CSS for Animations */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
        
        /* Shine Effect Animation */
        @keyframes shine-move {
          0% { left: -100%; opacity: 0; }
          50% { opacity: 0.5; }
          100% { left: 200%; opacity: 0; }
        }
        .animate-shine-effect {
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent);
          transform: skewX(-20deg);
          animation: shine-move 3s infinite;
        }
      `}</style>

      {/* BACKGROUND VIDEO LAYER */}
      <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
          <source src="/Maharashtra_Police_Animation_Video_Generation.mp4" type="video/mp4" />
        </video>
      </div>

      {/* GRADIENT OVERLAY */}
      <div className="fixed top-0 left-0 w-full h-full z-1 pointer-events-none" style={{ background: `linear-gradient(to bottom, rgba(10, 15, 30, 0.6), rgba(10, 15, 30, 0.8))` }} />

      <div className="relative z-10">
          <Navbar />

          {/* ✅ 1. OFFICIAL MARQUEE SECTION */}
          {/* Positioned to avoid overlap with Navbar on mobile */}
          <div className="fixed top-[80px] md:top-[74px] w-full z-30"> 
             <div className="bg-slate-950 border-y border-slate-800 text-white text-xs md:text-sm py-2 overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-blue-900/5 pointer-events-none"></div> 
                <div className="animate-marquee flex items-center">
                    <span className="mx-4 font-black text-red-500 bg-red-950/30 px-2 py-0.5 rounded border border-red-900 text-[10px] md:text-xs tracking-widest">OFFICIAL ALERT:</span>
                    <span className="mr-20 font-mono tracking-wide text-gray-300">{homeData.marquee || "Welcome to the Official Crime Reporting Portal. Please report incidents responsibly."}</span>
                    
                    <span className="mx-4 font-black text-yellow-500 bg-yellow-950/30 px-2 py-0.5 rounded border border-yellow-900 text-[10px] md:text-xs tracking-widest">HELPLINE:</span>
                    <span className="mr-20 font-mono tracking-wide text-gray-300">Emergency? Dial 112 immediately. Do not rely solely on web reports for life-threatening situations.</span>
                </div>
             </div>
          </div>

          {/* HERO SECTION */}
          <section className="relative flex flex-col md:flex-row justify-between items-center min-h-[85vh] px-6 md:px-12 pt-36 md:pt-40 gap-6">
            
            {/* Left: Logo */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-2 md:order-1">
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

            {/* Center Content */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="md:w-2/4 flex flex-col items-center text-center space-y-6 z-20 order-1 md:order-2">
               <div className="inline-block px-5 py-2 border border-cyan-500/40 rounded-full bg-cyan-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(6,182,212,0.3)] cursor-default">
                  <span className="text-cyan-400 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Official Crime Reporting Portal
                  </span>
               </div>

               <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-2xl">
                 Stay Vigilant. <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 animate-gradient-x">Report Crimes.</span>
               </h1>

               <p className="text-base md:text-lg text-gray-300 max-w-xl leading-relaxed drop-shadow-md">
                 Empowering citizens with a secure, anonymous, and real-time crime reporting platform. Justice is just a click away.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-6">
                 <Link to="/signup" className="group relative px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-lg shadow-blue-900/40 hover:shadow-blue-600/60 transition-all transform hover:-translate-y-1">
                   <div className="absolute inset-0 w-full h-full bg-white/20 group-hover:translate-x-full transition-transform duration-500 -skew-x-12"></div>
                   <span className="relative font-bold text-base flex items-center justify-center gap-2">Report Now</span>
                 </Link>
                 
                 <Link to="/legalaid" className="group px-8 py-3 bg-gray-800/60 border border-gray-600 hover:border-gray-400 rounded-xl backdrop-blur-md transition-all transform hover:-translate-y-1 hover:bg-gray-700/80 font-bold text-base flex items-center justify-center gap-2 shadow-lg">
                   Legal Aid
                 </Link>
               </div>
            </motion.div>

            {/* Right: Police Logo */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="md:w-1/4 flex justify-center order-3">
              <div className="bg-gray-900/40 backdrop-blur-xl border border-gray-700/30 p-6 rounded-[2rem] shadow-2xl w-full max-w-[280px] text-center hover:scale-105 transition-transform duration-500">
                <div className="flex justify-center mb-4 h-40 relative">
                    <img src="/Chandrapur_Police.png" alt="Police" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-50 w-50 object-contain drop-shadow-2xl" />
                </div>
                <p className="text-white text-lg font-bold tracking-wide">Maharashtra Police</p>
                <div className="mt-4 text-xs text-gray-400 font-mono border-t border-gray-600/50 pt-2">Protect & Serve</div>
              </div>
            </motion.div>
          </section>

          {/* ✅ 2. WANDERING REVIEWS SECTION (Floating Cards) */}
          {homeData.featuredReviews.length > 0 && (
            <section className="relative h-[300px] md:h-[400px] w-full overflow-hidden bg-gray-950/40 border-y border-gray-800">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <h2 className="text-4xl md:text-6xl font-black text-white/5 uppercase tracking-widest">Public Voice</h2>
                </div>

                <div className="absolute inset-0 w-full h-full">
                    {homeData.featuredReviews.slice(0, 6).map((review, index) => {
                        const randomTop = Math.floor(Math.random() * 60) + 10;
                        const randomLeft = Math.floor(Math.random() * 80) + 5;
                        const delay = index * 1.5;

                        return (
                            <motion.div
                                key={review._id}
                                drag // Click/Touch to Hold
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                animate={{
                                    x: [0, 60, -60, 40, -40, 0], 
                                    y: [0, -40, 30, -30, 20, 0], 
                                }}
                                transition={{
                                    duration: 20 + index * 3, 
                                    repeat: Infinity,
                                    repeatType: "mirror",
                                    ease: "easeInOut",
                                    delay: delay
                                }}
                                style={{ top: `${randomTop}%`, left: `${randomLeft}%` }}
                                className="absolute cursor-pointer z-20"
                            >
                                <div className="
                                    w-36 md:w-64 
                                    bg-slate-900/90 backdrop-blur-lg 
                                    border border-cyan-500/20 
                                    rounded-lg p-2 md:p-3 
                                    shadow-[0_0_20px_rgba(0,0,0,0.5)] 
                                    flex flex-col gap-1.5 
                                    hover:scale-110 hover:z-50 hover:border-cyan-400
                                    transition-all duration-300
                                    relative overflow-hidden group
                                ">
                                    <div className="animate-shine-effect pointer-events-none"></div>

                                    <div className="flex items-center gap-2">
                                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border border-cyan-400 p-0.5 shrink-0 bg-black">
                                            <img src={review.user?.idPhoto || "https://placehold.co/50"} className="w-full h-full rounded-full object-cover" alt="User" />
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-[9px] md:text-xs font-bold text-white truncate max-w-[80px] md:max-w-[120px]">
                                                {review.user?.firstName} {review.user?.lastName}
                                            </h4>
                                            <span className={`text-[7px] md:text-[9px] uppercase font-bold tracking-wider px-1 py-0 rounded bg-black/50 border border-slate-700 ${review.user?.role === 'citizen' ? 'text-cyan-400' : 'text-yellow-400'}`}>
                                                {review.user?.role === 'citizen' ? 'Citizen' : review.user?.designation || 'Officer'}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-[8px] md:text-[10px] text-gray-300 italic line-clamp-2 leading-tight font-medium">
                                        "{review.comment}"
                                    </p>

                                    <div className="flex text-yellow-400 text-[7px] md:text-[9px] gap-0.5">
                                        {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>
          )}

          {/* ✅ FEATURES SECTION */}
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

          {/* ✅ HOW IT WORKS (Restored) */}
          <section className="relative py-24 px-6 md:px-24 bg-black/60 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              <span className="border-b-4 border-blue-600 pb-2">How It Works</span>
            </h2>
            <div className="flex flex-col space-y-16 max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-blue-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-blue-500">📝</div></div>
                <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-blue-400 mb-3">1. Report a Crime</h3><p className="text-gray-300">Submit complaints securely and anonymously. Provide details and location with ease.</p></div>
              </div>
              <div className="flex flex-col md:flex-row-reverse items-center gap-10">
                <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-purple-500">📷</div></div>
                <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-purple-400 mb-3">2. Upload Evidence</h3><p className="text-gray-300">Attach photos, videos, or documents to support your complaint and accelerate verification.</p></div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="md:w-1/2 flex justify-center"><div className="w-24 h-24 bg-green-600/20 rounded-full flex items-center justify-center text-5xl border-2 border-green-500">🛡️</div></div>
                <div className="md:w-1/2 bg-gray-800/60 p-8 rounded-2xl border border-gray-700"><h3 className="text-2xl font-bold text-green-400 mb-3">3. Police Action</h3><p className="text-gray-300">Officers investigate in real-time. Get instant status updates on your dashboard.</p></div>
              </div>
            </div>
          </section>

          {/* ✅ MISSION STATEMENT (Restored) */}
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

          {/* ✅ STATS SECTION */}
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
          </section>

          {/* ✅ FAQ SECTION */}
          <section className="py-24 px-6 md:px-24 bg-gray-900/30">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center text-white mb-12 flex items-center justify-center gap-3">
                <FaQuestionCircle className="text-gray-500"/> Frequently Asked Questions
              </h2>
              
              <div className="grid gap-4">
                {homeData.faqs.length > 0 ? homeData.faqs.map((faq, index) => (
                    <div 
                        key={index} 
                        className={`bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'border-cyan-500/50 shadow-lg shadow-cyan-900/20' : 'hover:border-gray-600'}`}
                    >
                        <button 
                            onClick={() => toggleFaq(index)}
                            className="w-full text-left p-6 flex justify-between items-center focus:outline-none"
                        >
                            <span className="font-bold text-white text-lg">{faq.question}</span>
                            {openFaqIndex === index ? <FaChevronUp className="text-cyan-400"/> : <FaChevronDown className="text-gray-500"/>}
                        </button>
                        
                        <div 
                            className={`px-6 text-gray-400 text-sm leading-relaxed transition-all duration-300 ease-in-out ${openFaqIndex === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            {faq.answer}
                        </div>
                    </div>
                )) : (
                    <p className="text-center text-gray-500">No FAQs available at the moment.</p>
                )}
              </div>
            </div>
          </section>

          {/* ✅ CTA SECTION */}
          <section className="py-32 text-center bg-gradient-to-t from-black via-black/90 to-transparent">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white tracking-tight">Be a Responsible Citizen.</h2>
            <p className="text-gray-400 mb-12 text-xl max-w-2xl mx-auto px-4">
              Your report can save a life or prevent a crime. Join the network of vigilant citizens today.
            </p>
            <Link to="/signup" className="px-16 py-6 bg-purple-600 hover:bg-purple-700 rounded-full font-bold text-xl inline-block transition shadow-[0_0_40px_rgba(147,51,234,0.3)] hover:scale-105">
               Get Started Now
            </Link>
          </section>

          {/* FOOTER */}
          <footer className="py-8 text-center text-gray-600 text-sm bg-black border-t border-gray-900">
            <p>© 2025 CrimeTrack | Government of Maharashtra | All Rights Reserved.</p>
          </footer>

          {/* FLOATING CHAT BUTTON */}
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