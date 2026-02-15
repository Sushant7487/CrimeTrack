// import React, { useState } from "react";
// import HelpTab from "./HelpTab";
// import FeedbackTab from "./FeedbackTab";
// import { FaTicketAlt, FaStar } from "react-icons/fa";

// const SupportLayout = ({ userRole }) => {
//   const [activeTab, setActiveTab] = useState("help");

//   return (
//     <div className="max-w-5xl mx-auto animate-fade-in-up">
//       {/* Header */}
//       <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 shadow-xl mb-8">
//         <h1 className="text-3xl font-bold text-white mb-2">Help & Feedback Center</h1>
//         <p className="text-slate-400">
//           Need assistance? Raise a ticket. Want to rate us? Send a review.
//         </p>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-4 mb-6">
//         <button
//           onClick={() => setActiveTab("help")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
//             activeTab === "help"
//               ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50"
//               : "bg-slate-800 text-slate-400 hover:bg-slate-700"
//           }`}
//         >
//           <FaTicketAlt /> Help Tickets
//         </button>
//         <button
//           onClick={() => setActiveTab("feedback")}
//           className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
//             activeTab === "feedback"
//               ? "bg-purple-600 text-white shadow-lg shadow-purple-900/50"
//               : "bg-slate-800 text-slate-400 hover:bg-slate-700"
//           }`}
//         >
//           <FaStar /> Reviews & Suggestions
//         </button>
//       </div>

//       {/* Content */}
//       <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 shadow-2xl">
//         {activeTab === "help" ? <HelpTab /> : <FeedbackTab />}
//       </div>
//     </div>
//   );
// };

// export default SupportLayout;














import React, { useState } from "react";
import HelpTab from "./HelpTab";
import FeedbackTab from "./FeedbackTab";
import { FaTicketAlt, FaStar, FaLifeRing } from "react-icons/fa";

const SupportLayout = ({ userRole }) => {
  const [activeTab, setActiveTab] = useState("help");

  // --- UI STYLES & ANIMATION ---
  const styles = `
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    .animate-enter { animation: fadeIn 0.5s ease-out forwards; }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.4); }
  `;

  return (
    <div 
        className="h-screen w-full flex flex-col font-sans text-slate-100 overflow-hidden bg-cover bg-center relative"
        style={{ backgroundImage: "url('/assets/police-bg.png')" }} 
    >
      <style>{styles}</style>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/90 via-slate-900/85 to-black/95 pointer-events-none"></div>

      {/* --- HEADER --- */}
      <div className="relative z-20 w-full flex-none pt-6 px-6">
        <div className="flex flex-col md:flex-row items-center justify-between bg-white/5 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/10 shadow-2xl pl-8 md:pl-10">
            
            <div className="flex items-center gap-4 mb-3 md:mb-0 w-full md:w-auto">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 transform -rotate-3">
                    <FaLifeRing className="text-white text-2xl" />
                </div>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">Help Center</h1>
                    <p className="text-xs text-blue-200 uppercase tracking-[0.2em] font-bold opacity-80">Support & Feedback</p>
                </div>
            </div>

            {/* TABS (Pill Style) */}
            <div className="flex gap-2 bg-black/20 p-1.5 rounded-full border border-white/5 overflow-x-auto backdrop-blur-md">
                <button 
                    onClick={() => setActiveTab("help")} 
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-500 ${
                        activeTab === "help" 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-cyan-500/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <FaTicketAlt className={activeTab === "help" ? "animate-pulse" : ""} /> Help Tickets
                </button>

                <button 
                    onClick={() => setActiveTab("feedback")} 
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all duration-500 ${
                        activeTab === "feedback" 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/20' 
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                    <FaStar className={activeTab === "feedback" ? "animate-spin-slow" : ""} /> Reviews & Suggestions
                </button>
            </div>
        </div>
      </div>

      {/* --- CONTENT AREA --- */}
      <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-6">
        <div className="max-w-7xl mx-auto animate-enter">
            {activeTab === "help" ? <HelpTab /> : <FeedbackTab />}
        </div>
      </div>
    </div>
  );
};

export default SupportLayout;