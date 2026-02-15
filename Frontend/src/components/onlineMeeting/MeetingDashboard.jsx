// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaUserFriends, FaUserShield, FaVideo, FaListAlt } from "react-icons/fa";

// const MeetingDashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check karein ki user Senior hai ya Police
//   const isSenior = location.pathname.includes("senior");
//   const basePath = isSenior ? "/senior" : "/police";

//   return (
//     <div className="p-4 md:p-8">
//       <div className="flex items-center gap-4 mb-8">
//         <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
//           <FaVideo className="text-2xl text-white" />
//         </div>
//         <div>
//           <h2 className="text-3xl font-bold text-white">Online Meeting Center</h2>
//           <p className="text-gray-400">Schedule and manage video inquiries securely.</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
//         {/* CARD 1: Schedule with Citizen */}
//         <div 
//             onClick={() => navigate(`${basePath}/meeting/citizen`)}
//             className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-blue-500 cursor-pointer transition-all hover:scale-105 shadow-lg group"
//         >
//             <div className="w-14 h-14 bg-blue-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
//                 <FaUserFriends className="text-2xl text-blue-400 group-hover:text-white" />
//             </div>
//             <h3 className="text-xl font-bold text-white mb-2">Schedule Citizen Inquiry</h3>
//             <p className="text-sm text-gray-400">Create a video link for a citizen regarding a case or verification.</p>
//         </div>

//         {/* CARD 2: Schedule with Police */}
//         <div 
//             onClick={() => navigate(`${basePath}/meeting/police`)}
//             className="bg-slate-800 p-6 rounded-xl border border-slate-700 hover:border-emerald-500 cursor-pointer transition-all hover:scale-105 shadow-lg group"
//         >
//             <div className="w-14 h-14 bg-emerald-900/30 rounded-full flex items-center justify-center mb-4 group-hover:bg-emerald-600 transition-colors">
//                 <FaUserShield className="text-2xl text-emerald-400 group-hover:text-white" />
//             </div>
//             <h3 className="text-xl font-bold text-white mb-2">Internal Police Briefing</h3>
//             <p className="text-sm text-gray-400">Schedule a secure meeting with other officers or seniors.</p>
//         </div>

//         {/* ✅ CARD 3: VIEW & JOIN MEETINGS (Yeh Missing Tha) */}
//         <div 
//             onClick={() => navigate(`${basePath}/meeting/list`)}
//             className="bg-gradient-to-br from-indigo-900 to-slate-900 p-6 rounded-xl border border-indigo-500/50 hover:border-indigo-400 cursor-pointer transition-all hover:scale-105 shadow-xl group relative overflow-hidden"
//         >
//             <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-bl-full"></div>
            
//             <div className="w-14 h-14 bg-indigo-900/50 rounded-full flex items-center justify-center mb-4 group-hover:bg-indigo-600 transition-colors relative z-10">
//                 <FaListAlt className="text-2xl text-indigo-300 group-hover:text-white" />
//             </div>
//             <h3 className="text-xl font-bold text-white mb-2 relative z-10">View Scheduled Meetings</h3>
//             <p className="text-sm text-indigo-200 relative z-10">
//                 See all upcoming meetings and <span className="font-bold text-white underline">JOIN NOW</span>.
//             </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default MeetingDashboard;








// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaUserFriends, FaUserShield, FaVideo, FaListAlt, FaShieldAlt } from "react-icons/fa";

// const MeetingDashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Check user role
//   const isSenior = location.pathname.includes("senior");
//   const basePath = isSenior ? "/senior" : "/police";

//   // ✅ Placeholder for Background Image (Replace '/meeting-portal-bg.jpg' with your actual file)
//  

//   return (
//     <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
      
//       {/* 1. Background Image Layer */}
//       <div 
//         className="fixed inset-0 z-0"
//         style={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: "contain",
//             backgroundPosition: "center",
//             filter: "brightness(0.5) blur(1px)"
//         }}
//       />

//       {/* 2. Main Content Layer */}
//       <div className="relative z-10 flex-1 flex flex-col p-4 md:p-10 max-w-7xl mx-auto w-full">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 mb-10 gap-4">
//             <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.5)] border border-white/20 transform rotate-3 hover:rotate-0 transition-all duration-300">
//                     <FaShieldAlt className="text-3xl text-white drop-shadow-md" />
//                 </div>
//                 <div>
//                     <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-sm">
//                         CrimeTrack <span className="text-blue-500">Meeting Portal</span>
//                     </h1>
//                     <p className="text-blue-200/70 text-sm font-medium tracking-wide uppercase mt-1">
//                         Secure Video Conferencing System
//                     </p>
//                 </div>
//             </div>
            
//             <div className="hidden md:block text-right">
//                 <p className="text-xs text-gray-400 font-mono">SYSTEM STATUS: ONLINE</p>
//                 <p className="text-xs text-emerald-400 font-mono animate-pulse">ENCRYPTION: ACTIVE</p>
//             </div>
//         </div>

//         {/* --- ACTIONS GRID --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            
//             {/* CARD 1: Schedule Citizen */}
//             <div 
//                 onClick={() => navigate(`${basePath}/meeting/citizen`)}
//                 className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 overflow-hidden"
//             >
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
//                 <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors shadow-inner">
//                     <FaUserFriends className="text-3xl text-blue-400 group-hover:text-white transition-colors" />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Citizen Inquiry</h3>
//                 <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
//                     Schedule a secure one-on-one video session with a citizen for statement recording or verification.
//                 </p>
                
//                 <div className="mt-6 flex items-center text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                     SCHEDULE NOW →
//                 </div>
//             </div>

//             {/* CARD 2: Police Briefing */}
//             <div 
//                 onClick={() => navigate(`${basePath}/meeting/police`)}
//                 className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:border-emerald-500/50 overflow-hidden"
//             >
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-green-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

//                 <div className="w-16 h-16 bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors shadow-inner">
//                     <FaUserShield className="text-3xl text-emerald-400 group-hover:text-white transition-colors" />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">Internal Briefing</h3>
//                 <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
//                     Organize a secure briefing with other officers or high command for case discussions.
//                 </p>
                
//                 <div className="mt-6 flex items-center text-emerald-400 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                     ORGANIZE BRIEFING →
//                 </div>
//             </div>

//             {/* CARD 3: View Meetings */}
//             <div 
//                 onClick={() => navigate(`${basePath}/meeting/list`)}
//                 className="group relative bg-gradient-to-br from-indigo-900/80 to-slate-900/80 backdrop-blur-xl border border-indigo-500/30 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:border-indigo-400/60 overflow-hidden"
//             >
//                 {/* Decorative Background Element */}
//                 <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>

//                 <div className="relative z-10">
//                     <div className="w-16 h-16 bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors shadow-inner border border-indigo-500/20">
//                         <FaListAlt className="text-3xl text-indigo-300 group-hover:text-white transition-colors" />
//                     </div>
                    
//                     <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">Scheduled List</h3>
//                     <p className="text-sm text-indigo-200/70 leading-relaxed group-hover:text-indigo-100">
//                         View all upcoming sessions, check countdowns, and join active meetings immediately.
//                     </p>

//                     <div className="mt-6 flex items-center text-indigo-300 text-sm font-bold group-hover:text-white transition-colors">
//                         VIEW SCHEDULE →
//                     </div>
//                 </div>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingDashboard;













// import React from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { FaUserFriends, FaUserShield, FaListAlt, FaArrowLeft } from "react-icons/fa";

// const MeetingDashboard = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isSenior = location.pathname.includes("senior");
//   const basePath = isSenior ? "/senior" : "/police";

//   // Background Image
//   const bgImage = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770326291/ChatGPT_Image_Feb_6_2026_02_04_23_AM_zkg6x7.png"; 

//   return (
//     <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
      
//       {/* Background Layer */}
//       <div 
//         className="fixed inset-0 z-0"
//         style={{
//             backgroundImage: `url(${bgImage})`,
//             backgroundSize: "contain",
//             backgroundPosition: "center",
//             filter: "brightness(0.5) blur(1px)"
//         }}
//       />

//       {/* Main Content */}
//       <div className="relative z-10 flex-1 flex flex-col p-4 md:p-10 max-w-7xl mx-auto w-full">
        
//         {/* --- HEADER --- */}
//         <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-6 mb-10 gap-4">
//             <div className="flex items-center gap-6 w-full md:w-auto">
                
//                 {/* ✅ 1. BACK BUTTON */}
//                 <button 
//                     onClick={() => navigate(basePath)} 
//                     className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all border border-white/10 group"
//                 >
//                     <FaArrowLeft className="text-white text-lg group-hover:-translate-x-1 transition-transform" />
//                 </button>

//                 <div className="flex items-center gap-4">
//                     {/* ✅ 2. LOGO (Replace src with your actual logo path) */}
//                     <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden">
//                         {/* Agar Logo file hai toh yeh use karein: */}
//                         <img src="https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png" alt="Logo" className="w-full h-full object-contain " onError={(e) => e.target.style.display='none'} />
                        
//                         {/* Fallback agar logo image load na ho */}
//                         <span className="text-2xl font-bold text-blue-500" style={{display: 'none'}}>CT</span> 
//                     </div>

//                     <div>
//                         <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-sm">
//                             CrimeTrack <span className="text-blue-500">Meeting Portal</span>
//                         </h1>
//                         <p className="text-blue-200/70 text-sm font-medium tracking-wide uppercase mt-1">
//                             Secure Video Conferencing System
//                         </p>
//                     </div>
//                 </div>
//             </div>
            
//             <div className="hidden md:block text-right">
//                 <p className="text-xs text-gray-400 font-mono">SYSTEM STATUS: ONLINE</p>
//                 <p className="text-xs text-emerald-400 font-mono animate-pulse">ENCRYPTION: ACTIVE</p>
//             </div>
//         </div>

//         {/* --- ACTIONS GRID --- */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-4">
            
//             {/* CARD 1: Schedule Citizen */}
//             <div 
//                 onClick={() => navigate(`${basePath}/meeting/citizen`)}
//                 className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 overflow-hidden"
//             >
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                
//                 <div className="w-16 h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors shadow-inner">
//                     <FaUserFriends className="text-3xl text-blue-400 group-hover:text-white transition-colors" />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">Citizen Inquiry</h3>
//                 <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
//                     Schedule a secure one-on-one video session with a citizen for statement recording or verification.
//                 </p>
                
//                 <div className="mt-6 flex items-center text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                     SCHEDULE NOW →
//                 </div>
//             </div>

//             {/* CARD 2: Police Briefing */}
//             <div 
//                 onClick={() => navigate(`${basePath}/meeting/police`)}
//                 className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:border-emerald-500/50 overflow-hidden"
//             >
//                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-green-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

//                 <div className="w-16 h-16 bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors shadow-inner">
//                     <FaUserShield className="text-3xl text-emerald-400 group-hover:text-white transition-colors" />
//                 </div>
                
//                 <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">Internal Briefing</h3>
//                 <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
//                     Organize a secure briefing with other officers or high command for case discussions.
//                 </p>
                
//                 <div className="mt-6 flex items-center text-emerald-400 text-sm font-bold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
//                     ORGANIZE BRIEFING →
//                 </div>
//             </div>

//             {/* CARD 3: View Meetings */}
//             <div 
//                 onClick={() => navigate(`${basePath}/meeting/list`)}
//                 className="group relative bg-gradient-to-br from-indigo-900/80 to-slate-900/80 backdrop-blur-xl border border-indigo-500/30 p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:border-indigo-400/60 overflow-hidden"
//             >
//                 <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>

//                 <div className="relative z-10">
//                     <div className="w-16 h-16 bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors shadow-inner border border-indigo-500/20">
//                         <FaListAlt className="text-3xl text-indigo-300 group-hover:text-white transition-colors" />
//                     </div>
                    
//                     <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-200 transition-colors">Scheduled List</h3>
//                     <p className="text-sm text-indigo-200/70 leading-relaxed group-hover:text-indigo-100">
//                         View all upcoming sessions, check countdowns, and join active meetings immediately.
//                     </p>

//                     <div className="mt-6 flex items-center text-indigo-300 text-sm font-bold group-hover:text-white transition-colors">
//                         VIEW SCHEDULE →
//                     </div>
//                 </div>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default MeetingDashboard;















import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserFriends, FaUserShield, FaListAlt, FaArrowLeft } from "react-icons/fa";

const MeetingDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSenior = location.pathname.includes("senior");
  const basePath = isSenior ? "/senior" : "/police";

  // ✅ Wahi Background Image jo pichle code main thi
   const bgImage = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770326291/ChatGPT_Image_Feb_6_2026_02_04_23_AM_zkg6x7.png"; 

  return (
    // Parent Container: Fixed Height (Screen), No Scroll on Body
    <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
      
      {/* Background Layer (Fixed) */}
      <div 
        className="fixed inset-0 z-0"
        style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            filter: "brightness(0.6) blur(1px)"
        }}
      />

      {/* Main Content Layout (Flex Column) */}
      <div className="relative z-10 flex flex-col h-full max-w-7xl mx-auto w-full">
        
        {/* --- HEADER SECTION (Fixed / Chipka hua) --- */}
        {/* 'shrink-0' ensure karta hai ki yeh scroll na ho aur size kam na kare */}
        <div className="shrink-0 flex flex-col md:flex-row justify-between items-center border-b border-white/10 p-4 md:p-10 pb-4 md:pb-6 gap-4 bg-gray-900/10 backdrop-blur-sm z-20">
            <div className="flex items-center gap-4 w-full md:w-auto">
                
                {/* BACK BUTTON */}
                <button 
                    onClick={() => navigate(basePath)} 
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md transition-all border border-white/10 group shrink-0"
                >
                    <FaArrowLeft className="text-white text-lg group-hover:-translate-x-1 transition-transform" />
                </button>

                <div className="flex items-center gap-3 md:gap-4">
                    {/* ✅ LOGO LOGIC RESTORED */}
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center shadow-lg border border-white/20 overflow-hidden shrink-0">
                        <img src="https://res.cloudinary.com/dukrcgv8s/image/upload/v1770304918/CrimeTrack_abbtdr.png" alt="Logo" className="w-full h-full object-contain " onError={(e) => e.target.style.display='none'} />
                        <span className="text-xl md:text-2xl font-bold text-blue-500" style={{display: 'none'}}>CT</span> 
                    </div>

                    <div>
                        <h1 className="text-xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-200 drop-shadow-sm">
                            CrimeTrack <span className="text-blue-500 block md:inline">Meeting Portal</span>
                        </h1>
                        <p className="text-blue-200/70 text-[10px] md:text-sm font-medium tracking-wide uppercase mt-1">
                            Secure Video Conferencing System
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="hidden md:block text-right">
                <p className="text-xs text-gray-400 font-mono">SYSTEM STATUS: ONLINE</p>
                <p className="text-xs text-emerald-400 font-mono animate-pulse">ENCRYPTION: ACTIVE</p>
            </div>
        </div>

        {/* --- SCROLLABLE CONTENT AREA (Cards yahan scroll honge) --- */}
        {/* 'flex-1 overflow-y-auto' ka matlab: Bachi hui jagah lo aur sirf is area ko scroll karo */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 pb-20">
                
                {/* CARD 1: Schedule Citizen */}
                <div 
                    onClick={() => navigate(`${basePath}/meeting/citizen`)}
                    className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(59,130,246,0.3)] hover:border-blue-500/50 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-cyan-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                    
                    <div className="w-14 h-14 md:w-16 md:h-16 bg-blue-900/50 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-blue-600 transition-colors shadow-inner">
                        <FaUserFriends className="text-2xl md:text-3xl text-blue-400 group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-300 transition-colors">Citizen Inquiry</h3>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                        Schedule a secure one-on-one video session with a citizen for statement recording.
                    </p>
                    
                    <div className="mt-4 md:mt-6 flex items-center text-blue-400 text-sm font-bold opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        SCHEDULE NOW →
                    </div>
                </div>

                {/* CARD 2: Police Briefing */}
                <div 
                    onClick={() => navigate(`${basePath}/meeting/police`)}
                    className="group relative bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 md:p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(16,185,129,0.3)] hover:border-emerald-500/50 overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-green-400 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                    <div className="w-14 h-14 md:w-16 md:h-16 bg-emerald-900/50 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-emerald-600 transition-colors shadow-inner">
                        <FaUserShield className="text-2xl md:text-3xl text-emerald-400 group-hover:text-white transition-colors" />
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-emerald-300 transition-colors">Internal Briefing</h3>
                    <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300">
                        Organize a secure briefing with other officers or high command for case discussions.
                    </p>
                    
                    <div className="mt-4 md:mt-6 flex items-center text-emerald-400 text-sm font-bold opacity-100 md:opacity-0 group-hover:opacity-100 transform translate-y-0 md:translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        ORGANIZE BRIEFING →
                    </div>
                </div>

                {/* CARD 3: View Meetings */}
                <div 
                    onClick={() => navigate(`${basePath}/meeting/list`)}
                    className="group relative bg-gradient-to-br from-indigo-900/80 to-slate-900/80 backdrop-blur-xl border border-indigo-500/30 p-6 md:p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_rgba(99,102,241,0.4)] hover:border-indigo-400/60 overflow-hidden"
                >
                    <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl group-hover:bg-indigo-500/30 transition-all"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 md:w-16 md:h-16 bg-indigo-900/50 rounded-2xl flex items-center justify-center mb-4 md:mb-6 group-hover:bg-indigo-600 transition-colors shadow-inner border border-indigo-500/20">
                            <FaListAlt className="text-2xl md:text-3xl text-indigo-300 group-hover:text-white transition-colors" />
                        </div>
                        
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-indigo-200 transition-colors">Scheduled List</h3>
                        <p className="text-sm text-indigo-200/70 leading-relaxed group-hover:text-indigo-100">
                            View all upcoming sessions, check countdowns, and join active meetings immediately.
                        </p>

                        <div className="mt-4 md:mt-6 flex items-center text-indigo-300 text-sm font-bold group-hover:text-white transition-colors">
                            VIEW SCHEDULE →
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingDashboard;