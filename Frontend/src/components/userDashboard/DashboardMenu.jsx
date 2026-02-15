

// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, FaHistory, FaWhatsapp
// } from "react-icons/fa";

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "my_complaints",
//       title: "My Reported Crimes", // ✅ First Position
//       desc: "View case history and status reports.",
//       icon: <FaHistory />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true,
//       path: "/user/history" 
//     },
//     {
//       id: "report",
//       title: "Report a Crime",
//       desc: "File a complaint for theft, harassment, or cyber crime.",
//       icon: <FaUserShield />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/user/report" 
//     },
//     {
//       id: "police_connect",
//       title: "Police Connect",
//       desc: "Chat with Investigating Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/user/messages" 
//     },
//     {
//       id: "emergency",
//       title: "Emergency SOS",
//       desc: "Trigger immediate alert to nearest PCR.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isRoute: false
//     },
//     {
//       id: "status",
//       title: "Track Status",
//       desc: "Check progress of your FIR/Complaint.",
//       icon: <FaSearch />,
//       color: "from-purple-600 to-purple-400",
//       isRoute: true,
//       path: "/user/track"
//     },
//     {
//       id: "docs",
//       title: "Legal Docs",
//       desc: "Download forms and legal awareness PDFs.",
//       icon: <FaFileContract />,
//       color: "from-orange-600 to-orange-400"
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     <div className="space-y-6 md:space-y-8 animate-fade-in-down pb-10">
      
//       {/* Header Container - Senior Dashboard Style */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
//         {/* Text Section - Added pr-24 for mobile text protection */}
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{userName || "Citizen"}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Your safety is our priority. Report incidents securely.
//           </p>
//         </div>
        
//         {/* ✅ LOGO FIXED: EXACTLY LIKE SENIOR MENU */}
//         <img 
//             src="/Chandrapur_Police.png" 
//             alt="Logo" 
//             className="
//                 absolute 
                
//                 /* --- MOBILE VIEW --- */
//                 /* Vertically Centered & Right Aligned */
//                 top-1/2 right-4 -translate-y-1/2 
//                 h-35 w-35 
//                 opacity-80 
                
//                 /* --- DESKTOP VIEW --- */
//                 /* Vertically Centered & Scaled to Container Height */
//                 md:top-1/2 md:right-10 md:-translate-y-1/2 
//                 md:h-[95%] md:w-auto 
//                 md:max-w-[200px]
//                 md:opacity-100 
                
//                 object-contain pointer-events-none drop-shadow-lg transition-all duration-300
//             " 
//         />
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {menuItems.map((item) => (
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             key={item.id}
//             onClick={() => handleItemClick(item)} 
//             className={`
//                 p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                 bg-gray-800 border border-gray-700 hover:border-blue-500/50 hover:shadow-2xl
//                 ${item.id === 'emergency' ? 'border-red-500/50 bg-red-900/10 hover:bg-red-900/20' : ''}
//             `}
//           >
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             <div className="flex-1">
//                 <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${item.id === 'emergency' ? 'text-red-400' : 'text-white group-hover:text-blue-400'}`}>
//                     {item.title}
//                 </h3>
//                 <p className="text-gray-400 text-xs md:text-sm font-medium">
//                     {item.desc}
//                 </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardMenu;











// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, FaHistory, FaWhatsapp, FaVideo
// } from "react-icons/fa";

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "my_complaints",
//       title: "My Reported Crimes", // ✅ First Position
//       desc: "View case history and status reports.",
//       icon: <FaHistory />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true,
//       path: "/user/history" 
//     },
//     {
//       id: "report",
//       title: "Report a Crime",
//       desc: "File a complaint for theft, harassment, or cyber crime.",
//       icon: <FaUserShield />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/user/report" 
//     },
//     {
//       id: "meetings", 
//       title: "Online Meetings", 
//       desc: "Join scheduled video inquiries.",
//       icon: <FaVideo />, 
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/user/meetings" 
//     },
//     {
//       id: "police_connect",
//       title: "Police Connect",
//       desc: "Chat with Investigating Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/user/messages" 
//     },
//     {
//       id: "emergency",
//       title: "Emergency SOS",
//       desc: "Trigger immediate alert to nearest PCR.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isRoute: false
//     },
//     {
//       id: "status",
//       title: "Track Status",
//       desc: "Check progress of your FIR/Complaint.",
//       icon: <FaSearch />,
//       color: "from-purple-600 to-purple-400",
//       isRoute: true,
//       path: "/user/track"
//     },
//     {
//       id: "docs",
//       title: "Legal Docs",
//       desc: "Download forms and legal awareness PDFs.",
//       icon: <FaFileContract />,
//       color: "from-orange-600 to-orange-400"
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     <div className="space-y-6 md:space-y-8 animate-fade-in-down pb-10">
      
//       {/* Header Container - Senior Dashboard Style */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
//         {/* Text Section - Added pr-24 for mobile text protection */}
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{userName || "Citizen"}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Your safety is our priority. Report incidents securely.
//           </p>
//         </div>
        
//         {/* ✅ LOGO FIXED: EXACTLY LIKE SENIOR MENU */}
//         <img 
//             src="/Chandrapur_Police.png" 
//             alt="Logo" 
//             className="
//                 absolute 
                
//                 /* --- MOBILE VIEW --- */
//                 /* Vertically Centered & Right Aligned */
//                 top-1/2 right-4 -translate-y-1/2 
//                 h-35 w-35 
//                 opacity-80 
                
//                 /* --- DESKTOP VIEW --- */
//                 /* Vertically Centered & Scaled to Container Height */
//                 md:top-1/2 md:right-10 md:-translate-y-1/2 
//                 md:h-[95%] md:w-auto 
//                 md:max-w-[200px]
//                 md:opacity-100 
                
//                 object-contain pointer-events-none drop-shadow-lg transition-all duration-300
//             " 
//         />
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {menuItems.map((item) => (
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             key={item.id}
//             onClick={() => handleItemClick(item)} 
//             className={`
//                 p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                 bg-gray-800 border border-gray-700 hover:border-blue-500/50 hover:shadow-2xl
//                 ${item.id === 'emergency' ? 'border-red-500/50 bg-red-900/10 hover:bg-red-900/20' : ''}
//             `}
//           >
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             <div className="flex-1">
//                 <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${item.id === 'emergency' ? 'text-red-400' : 'text-white group-hover:text-blue-400'}`}>
//                     {item.title}
//                 </h3>
//                 <p className="text-gray-400 text-xs md:text-sm font-medium">
//                     {item.desc}
//                 </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardMenu;










// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, 
//   FaHistory, FaWhatsapp, FaVideo, FaHeadset // ✅ Imported FaHeadset
// } from "react-icons/fa";

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "my_complaints",
//       title: "My Reported Crimes", // ✅ First Position
//       desc: "View case history and status reports.",
//       icon: <FaHistory />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true,
//       path: "/user/history" 
//     },
//     {
//       id: "report",
//       title: "Report a Crime",
//       desc: "File a complaint for theft, harassment, or cyber crime.",
//       icon: <FaUserShield />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/user/report" 
//     },
//     {
//       id: "meetings", 
//       title: "Online Meetings", 
//       desc: "Join scheduled video inquiries.",
//       icon: <FaVideo />, 
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/user/meetings" 
//     },
//     {
//       id: "police_connect",
//       title: "Police Connect",
//       desc: "Chat with Investigating Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/user/messages" 
//     },
//     {
//       id: "emergency",
//       title: "Emergency SOS",
//       desc: "Trigger immediate alert to nearest PCR.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isRoute: false
//     },
//     {
//       id: "status",
//       title: "Track Status",
//       desc: "Check progress of your FIR/Complaint.",
//       icon: <FaSearch />,
//       color: "from-purple-600 to-purple-400",
//       isRoute: true,
//       path: "/user/track"
//     },
//     {
//   id: "notices",
//   title: "Official Notices",
//   desc: "View legal notices from Police.",
//   icon: <FaFeatherAlt />, // Make sure to import this
//   color: "from-amber-600 to-yellow-500",
//   isRoute: false
// },
//     {
//       id: "docs",
//       title: "Legal Docs",
//       desc: "Download forms and legal awareness PDFs.",
//       icon: <FaFileContract />,
//       color: "from-orange-600 to-orange-400"
//     },
//     // ✅ ADDED HELP & SUPPORT ITEM
//     {
//       id: "support",
//       title: "Help & Support",
//       desc: "Raise tickets, reviews & suggestions.",
//       icon: <FaHeadset />,
//       color: "from-pink-600 to-rose-400",
//       isRoute: false
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     <div className="space-y-6 md:space-y-8 animate-fade-in-down pb-10">
      
//       {/* Header Container - Senior Dashboard Style */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
//         {/* Text Section - Added pr-24 for mobile text protection */}
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{userName || "Citizen"}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Your safety is our priority. Report incidents securely.
//           </p>
//         </div>
        
//         {/* ✅ LOGO FIXED: EXACTLY LIKE SENIOR MENU */}
//         <img 
//             src="/Chandrapur_Police.png" 
//             alt="Logo" 
//             className="
//                 absolute 
                
//                 /* --- MOBILE VIEW --- */
//                 /* Vertically Centered & Right Aligned */
//                 top-1/2 right-4 -translate-y-1/2 
//                 h-35 w-35 
//                 opacity-80 
                
//                 /* --- DESKTOP VIEW --- */
//                 /* Vertically Centered & Scaled to Container Height */
//                 md:top-1/2 md:right-10 md:-translate-y-1/2 
//                 md:h-[95%] md:w-auto 
//                 md:max-w-[200px]
//                 md:opacity-100 
                
//                 object-contain pointer-events-none drop-shadow-lg transition-all duration-300
//             " 
//         />
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {menuItems.map((item) => (
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             key={item.id}
//             onClick={() => handleItemClick(item)} 
//             className={`
//                 p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                 bg-gray-800 border border-gray-700 hover:border-blue-500/50 hover:shadow-2xl
//                 ${item.id === 'emergency' ? 'border-red-500/50 bg-red-900/10 hover:bg-red-900/20' : ''}
//             `}
//           >
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             <div className="flex-1">
//                 <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${item.id === 'emergency' ? 'text-red-400' : 'text-white group-hover:text-blue-400'}`}>
//                     {item.title}
//                 </h3>
//                 <p className="text-gray-400 text-xs md:text-sm font-medium">
//                     {item.desc}
//                 </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardMenu;











// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, 
//   FaHistory, FaWhatsapp, FaVideo, FaHeadset, FaFeatherAlt // ✅ Imported FaFeatherAlt
// } from "react-icons/fa";

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
    // {
    //   id: "my_complaints",
    //   title: "My Reported Crimes",
    //   desc: "View case history and status reports.",
    //   icon: <FaHistory />,
    //   color: "from-indigo-600 to-indigo-400",
    //   isRoute: true,
    //   path: "/user/history" 
    // },
    // // ✅ OFFICIAL NOTICES (New Feature)
    // {
    //   id: "notices",
    //   title: "Official Notices",
    //   desc: "View legal notices from Police.",
    //   icon: <FaFeatherAlt />, 
    //   color: "from-amber-600 to-yellow-500",
    //   isRoute: false
    // },
    // {
    //   id: "report",
    //   title: "Report a Crime",
    //   desc: "File a complaint for theft, harassment, or cyber crime.",
    //   icon: <FaUserShield />,
    //   color: "from-blue-600 to-blue-400",
    //   isRoute: true,
    //   path: "/user/report" 
    // },
    // {
    //   id: "meetings", 
    //   title: "Online Meetings", 
    //   desc: "Join scheduled video inquiries.",
    //   icon: <FaVideo />, 
    //   color: "from-cyan-600 to-cyan-400",
    //   isRoute: true,
    //   path: "/user/meetings" 
    // },
    // {
    //   id: "police_connect",
    //   title: "Police Connect",
    //   desc: "Chat with Investigating Officers",
    //   icon: <FaWhatsapp />,
    //   color: "from-emerald-600 to-teal-400",
    //   isRoute: true, 
    //   path: "/user/messages" 
    // },
    // {
    //   id: "emergency",
    //   title: "Emergency SOS",
    //   desc: "Trigger immediate alert to nearest PCR.",
    //   icon: <FaExclamationTriangle />,
    //   color: "from-red-600 to-red-500",
    //   isRoute: false
    // },
    // {
    //   id: "status",
    //   title: "Track Status",
    //   desc: "Check progress of your FIR/Complaint.",
    //   icon: <FaSearch />,
    //   color: "from-purple-600 to-purple-400",
    //   isRoute: true,
    //   path: "/user/track"
    // },
    // {
    //   id: "docs",
    //   title: "Legal Docs",
    //   desc: "Download forms and legal awareness PDFs.",
    //   icon: <FaFileContract />,
    //   color: "from-orange-600 to-orange-400"
    // },
    // {
    //   id: "support",
    //   title: "Help & Support",
    //   desc: "Raise tickets, reviews & suggestions.",
    //   icon: <FaHeadset />,
    //   color: "from-pink-600 to-rose-400",
    //   isRoute: false
    // }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     <div className="space-y-6 md:space-y-8 animate-fade-in-down pb-10">
      
//       {/* Header Container */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{userName || "Citizen"}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Your safety is our priority. Report incidents securely.
//           </p>
//         </div>
        
//         <img 
//             src="/Chandrapur_Police.png" 
//             alt="Logo" 
//             className="absolute top-1/2 right-4 -translate-y-1/2 h-35 w-35 opacity-80 md:top-1/2 md:right-10 md:-translate-y-1/2 md:h-[95%] md:w-auto md:max-w-[200px] md:opacity-100 object-contain pointer-events-none drop-shadow-lg transition-all duration-300" 
//         />
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {menuItems.map((item) => (
//           <motion.div 
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             key={item.id}
//             onClick={() => handleItemClick(item)} 
//             className={`
//                 p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                 bg-gray-800 border border-gray-700 hover:border-blue-500/50 hover:shadow-2xl
//                 ${item.id === 'emergency' ? 'border-red-500/50 bg-red-900/10 hover:bg-red-900/20' : ''}
//             `}
//           >
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             <div className="flex-1">
//                 <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${item.id === 'emergency' ? 'text-red-400' : 'text-white group-hover:text-blue-400'}`}>
//                     {item.title}
//                 </h3>
//                 <p className="text-gray-400 text-xs md:text-sm font-medium">
//                     {item.desc}
//                 </p>
//             </div>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardMenu;












// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, 
//   FaHistory, FaWhatsapp, FaVideo, FaHeadset, FaFeatherAlt 
// } from "react-icons/fa";

// // Variants for staggered animation
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 }
// };

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "my_complaints",
//       title: "CASE HISTORY",
//       desc: "View past reports & case files.",
//       icon: <FaHistory />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true,
//       path: "/user/history" 
//     },
//     {
//       id: "notices",
//       title: "OFFICIAL NOTICES",
//       desc: "Legal summons & police circulars.",
//       icon: <FaFeatherAlt />, 
//       color: "from-amber-600 to-yellow-500",
//       isRoute: false
//     },
//     {
//       id: "report",
//       title: "REPORT CRIME",
//       desc: "File secure complaints online.",
//       icon: <FaUserShield />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/user/report" 
//     },
//     {
//       id: "meetings", 
//       title: "VIDEO INQUIRY", 
//       desc: "Join scheduled video sessions.",
//       icon: <FaVideo />, 
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/user/meetings" 
//     },
//     {
//       id: "police_connect",
//       title: "POLICE CONNECT",
//       desc: "Direct chat with officers.",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/user/messages" 
//     },
//     {
//       id: "emergency",
//       title: "EMERGENCY SOS",
//       desc: "Trigger PCR alert instantly.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-rose-500",
//       isRoute: false,
//       isDanger: true
//     },
//     {
//       id: "status",
//       title: "TRACK STATUS",
//       desc: "Check live complaint progress.",
//       icon: <FaSearch />,
//       color: "from-purple-600 to-purple-400",
//       isRoute: true,
//       path: "/user/track"
//     },
//     {
//       id: "docs",
//       title: "LEGAL DOCS",
//       desc: "Download forms & guidelines.",
//       icon: <FaFileContract />,
//       color: "from-orange-600 to-orange-400"
//     },
//     {
//       id: "support",
//       title: "HELP CENTER",
//       desc: "FAQs, tickets & support.",
//       icon: <FaHeadset />,
//       color: "from-pink-600 to-rose-400",
//       isRoute: false
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="space-y-8 pb-10"
//     >
      
//       {/* --- HEADER SECTION --- */}
//       <motion.div 
//         variants={itemVariants}
//         className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between group hover:border-blue-500/30 transition-all duration-500"
//       >
//         {/* Glow Effect */}
//         <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-all duration-500"></div>

//         <div className="relative z-10 w-full md:w-2/3">
//           <h1 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight tracking-tight">
//             Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{userName || "Citizen"}</span>
//           </h1>
//           <p className="text-sm md:text-base text-slate-400 font-mono mt-2 flex items-center gap-2">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
//             System Operational • Secure Connection Active
//           </p>
//         </div>
        
//         {/* Logo with Glass Effect */}
//         <div className="relative mt-6 md:mt-0 p-4 bg-white/5 rounded-2xl border border-white/10 shadow-lg backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
//             <img 
//                 src="/Chandrapur_Police.png" 
//                 alt="Logo" 
//                 className="h-20 w-auto md:h-28 object-contain drop-shadow-2xl" 
//             />
//         </div>
//       </motion.div>

//       {/* --- MENU GRID --- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {menuItems.map((item) => (
//           <motion.div 
//             key={item.id}
//             variants={itemVariants}
//             whileHover={{ scale: 1.02, y: -5 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => handleItemClick(item)} 
//             className={`
//                 relative p-6 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
//                 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-xl
//                 hover:border-opacity-100 hover:shadow-2xl
//                 ${item.isDanger 
//                     ? 'hover:border-red-500/50 hover:shadow-red-900/20' 
//                     : 'hover:border-blue-500/50 hover:shadow-blue-900/20'
//                 }
//             `}
//           >
//             {/* Hover Gradient Background */}
//             <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
//             <div className="flex items-start justify-between mb-4 relative z-10">
//                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
//                     {item.icon}
//                 </div>
//                 {item.isDanger && (
//                     <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded border border-red-500/30 animate-pulse">
//                         URGENT
//                     </span>
//                 )}
//             </div>
            
//             <div className="relative z-10">
//                 <h3 className={`text-lg font-black tracking-wide mb-1 transition-colors ${item.isDanger ? 'text-white group-hover:text-red-400' : 'text-white group-hover:text-blue-300'}`}>
//                     {item.title}
//                 </h3>
//                 <p className="text-slate-400 text-xs font-mono font-medium group-hover:text-slate-300 transition-colors">
//                     {item.desc}
//                 </p>
//             </div>

//             {/* Corner Accent */}
//             <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${item.color} opacity-5 rounded-tl-3xl group-hover:opacity-10 transition-opacity`}></div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default DashboardMenu;







// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, 
//   FaHistory, FaWhatsapp, FaVideo, FaHeadset, FaFeatherAlt 
// } from "react-icons/fa";

// // Variants for staggered animation
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 }
// };

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "my_complaints",
//       title: "CASE HISTORY",
//       desc: "View past reports & case files.",
//       icon: <FaHistory />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true,
//       path: "/user/history" 
//     },
//     {
//       id: "notices",
//       title: "OFFICIAL NOTICES",
//       desc: "Legal summons & police circulars.",
//       icon: <FaFeatherAlt />, 
//       color: "from-amber-600 to-yellow-500",
//       isRoute: false
//     },
//     {
//       id: "report",
//       title: "REPORT CRIME",
//       desc: "File secure complaints online.",
//       icon: <FaUserShield />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/user/report" 
//     },
//     {
//       id: "meetings", 
//       title: "VIDEO INQUIRY", 
//       desc: "Join scheduled video sessions.",
//       icon: <FaVideo />, 
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/user/meetings" 
//     },
//     {
//       id: "police_connect",
//       title: "POLICE CONNECT",
//       desc: "Direct chat with officers.",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/user/messages" 
//     },
//     {
//       id: "emergency",
//       title: "EMERGENCY SOS",
//       desc: "Trigger PCR alert instantly.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-rose-500",
//       isRoute: false,
//       isDanger: true
//     },
//     {
//       id: "status",
//       title: "TRACK STATUS",
//       desc: "Check live complaint progress.",
//       icon: <FaSearch />,
//       color: "from-purple-600 to-purple-400",
//       isRoute: true,
//       path: "/user/track"
//     },
//     {
//       id: "docs",
//       title: "LEGAL DOCS",
//       desc: "Download forms & guidelines.",
//       icon: <FaFileContract />,
//       color: "from-orange-600 to-orange-400"
//     },
//     {
//       id: "support",
//       title: "HELP CENTER",
//       desc: "FAQs, tickets & support.",
//       icon: <FaHeadset />,
//       color: "from-pink-600 to-rose-400",
//       isRoute: false
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="space-y-6 pb-10" // Reduced space-y slightly
//     >
      
//       {/* --- HEADER SECTION (FIXED HEIGHT & POSITION) --- */}
//       <motion.div 
//         variants={itemVariants}
//         // ✅ Adjusted top position and Z-index
//         // ✅ Reduced padding (p-5 instead of p-10)
//         // ✅ Increased opacity (bg-slate-900/95) to hide scrolling content behind it
//         className="sticky top-20 z-40 relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-5 rounded-2xl shadow-xl overflow-hidden flex flex-row items-center justify-between group transition-all duration-500 mb-2"
//       >
//         {/* Glow Effect */}
//         <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-500"></div>

//         <div className="relative z-10 w-full md:w-auto">
//           {/* ✅ Reduced font size to avoid line break */}
//           <h1 className="text-3xl md:text-4xl font-black text-white mb-1 leading-tight tracking-tight">
//             Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{userName || "Citizen"}</span>
//           </h1>
//           <p className="text-xs md:text-sm text-slate-400 font-mono flex items-center gap-2">
//             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
//             System Operational • Secure Active
//           </p>
//         </div>
        
//         {/* ✅ Logo Size Balanced (h-20 to h-24) */}
//         <div className="hidden md:block relative p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
//             <img 
//                 src="/Chandrapur_Police.png" 
//                 alt="Logo" 
//                 className="h-29 w-auto object-contain drop-shadow-2xl" 
//             />
//         </div>
//       </motion.div>

//       {/* --- MENU GRID --- */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         {menuItems.map((item) => (
//           <motion.div 
//             key={item.id}
//             variants={itemVariants}
//             whileHover={{ scale: 1.02, y: -5 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => handleItemClick(item)} 
//             className={`
//                 relative p-6 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
//                 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-xl
//                 hover:border-opacity-100 hover:shadow-2xl
//                 ${item.isDanger 
//                     ? 'hover:border-red-500/50 hover:shadow-red-900/20' 
//                     : 'hover:border-blue-500/50 hover:shadow-blue-900/20'
//                 }
//             `}
//           >
//             <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
//             <div className="flex items-start justify-between mb-4 relative z-10">
//                 <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
//                     {item.icon}
//                 </div>
//                 {item.isDanger && (
//                     <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded border border-red-500/30 animate-pulse">
//                         URGENT
//                     </span>
//                 )}
//             </div>
            
//             <div className="relative z-10">
//                 <h3 className={`text-lg font-black tracking-wide mb-1 transition-colors ${item.isDanger ? 'text-white group-hover:text-red-400' : 'text-white group-hover:text-blue-300'}`}>
//                     {item.title}
//                 </h3>
//                 <p className="text-slate-400 text-xs font-mono font-medium group-hover:text-slate-300 transition-colors">
//                     {item.desc}
//                 </p>
//             </div>

//             <div className={`absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl ${item.color} opacity-5 rounded-tl-3xl group-hover:opacity-10 transition-opacity`}></div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default DashboardMenu;











// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, 
//   FaHistory, FaWhatsapp, FaVideo, FaHeadset, FaFeatherAlt 
// } from "react-icons/fa";

// // Variants for staggered animation
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 }
// };

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//  {
//       id: "my_complaints",
//       title: "My Reported Crimes",
//       desc: "View case history and status reports.",
//       icon: <FaHistory />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true,
//       path: "/user/history" 
//     },
//     // ✅ OFFICIAL NOTICES (New Feature)
//     {
//       id: "notices",
//       title: "Official Notices",
//       desc: "View legal notices from Police.",
//       icon: <FaFeatherAlt />, 
//       color: "from-amber-600 to-yellow-500",
//       isRoute: false
//     },
//     {
//       id: "report",
//       title: "Report a Crime",
//       desc: "File a complaint for theft, harassment, or cyber crime.",
//       icon: <FaUserShield />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/user/report" 
//     },
//     {
//       id: "meetings", 
//       title: "Online Meetings", 
//       desc: "Join scheduled video inquiries.",
//       icon: <FaVideo />, 
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/user/meetings" 
//     },
//     {
//       id: "police_connect",
//       title: "Police Connect",
//       desc: "Chat with Investigating Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/user/messages" 
//     },
//     {
//       id: "emergency",
//       title: "Emergency SOS",
//       desc: "Trigger immediate alert to nearest PCR.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isRoute: false
//     },
//     {
//       id: "status",
//       title: "Track Status",
//       desc: "Check progress of your FIR/Complaint.",
//       icon: <FaSearch />,
//       color: "from-purple-600 to-purple-400",
//       isRoute: true,
//       path: "/user/track"
//     },
//     {
//       id: "docs",
//       title: "Legal Docs",
//       desc: "Download forms and legal awareness PDFs.",
//       icon: <FaFileContract />,
//       color: "from-orange-600 to-orange-400"
//     },
//     {
//       id: "support",
//       title: "Help & Support",
//       desc: "Raise tickets, reviews & suggestions.",
//       icon: <FaHeadset />,
//       color: "from-pink-600 to-rose-400",
//       isRoute: false
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="space-y-6 pb-10"
//     >
      
//       {/* --- STICKY HEADER SECTION --- */}
//       <motion.div 
//         variants={itemVariants}
//         className="sticky top-20 z-40 relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-4 md:p-5 rounded-2xl shadow-xl overflow-hidden mb-2"
//       >
//         {/* Glow Effect */}
//         <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl transition-all duration-500"></div>

//         {/* ✅ FLEX CONTAINER CHANGE:
//             - Mobile: 'flex-col' (Stack vertically)
//             - Desktop: 'md:flex-row' (Side by side)
//         */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
            
//             {/* ✅ LOGO CHANGE:
//                 - Mobile: 'order-first' (Sabse upar dikhega)
//                 - Desktop: 'md:order-last' (Right side par dikhega)
//             */}
//             <div className="order-first md:order-last p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
//                 <img 
//                     src="/Chandrapur_Police.png" 
//                     alt="Logo" 
//                     className="h-19 w-auto md:h-30 object-contain drop-shadow-2xl" 
//                 />
//             </div>

//             {/* TEXT SECTION */}
//             {/* Mobile: Text Center, Desktop: Text Left */}
//             <div className="w-full md:w-auto text-center md:text-left">
//                 <h1 className="text-2xl md:text-4xl font-black text-white mb-1 leading-tight tracking-tight">
//                     Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{userName || "Citizen"}</span>
//                 </h1>
//                 <p className="text-[10px] md:text-sm text-slate-400 font-mono flex items-center justify-center md:justify-start gap-2">
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
//                     System Operational • Secure Active
//                 </p>
//             </div>

//         </div>
//       </motion.div>

//       {/* --- MENU GRID --- */}
//       {/* ✅ GRID CHANGE:
//          - Mobile: 'grid-cols-2' (2 items per row)
//          - Desktop: 'lg:grid-cols-3' (3 items per row)
//       */}
//       <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
//         {menuItems.map((item) => (
//           <motion.div 
//             key={item.id}
//             variants={itemVariants}
//             whileHover={{ scale: 1.02, y: -5 }}
//             whileTap={{ scale: 0.98 }}
//             onClick={() => handleItemClick(item)} 
//             className={`
//                 relative p-4 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
//                 bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-xl
//                 hover:border-opacity-100 hover:shadow-2xl
//                 ${item.isDanger 
//                     ? 'hover:border-red-500/50 hover:shadow-red-900/20' 
//                     : 'hover:border-blue-500/50 hover:shadow-blue-900/20'
//                 }
//             `}
//           >
//             <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
            
//             <div className="flex flex-col md:flex-row items-start justify-between mb-2 md:mb-4 relative z-10">
//                 {/* Icon Size Adjusted for Mobile */}
//                 <div className={`w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-lg md:text-2xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-2 md:mb-0`}>
//                     {item.icon}
//                 </div>
//                 {item.isDanger && (
//                     <span className="bg-red-500/20 text-red-400 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/30 animate-pulse absolute top-0 right-0 md:relative">
//                         SOS
//                     </span>
//                 )}
//             </div>
            
//             <div className="relative z-10">
//                 {/* Text Size Adjusted for Mobile 2-col layout */}
//                 <h3 className={`text-sm md:text-lg font-black tracking-wide mb-1 transition-colors ${item.isDanger ? 'text-white group-hover:text-red-400' : 'text-white group-hover:text-blue-300'}`}>
//                     {item.title}
//                 </h3>
//                 <p className="text-slate-400 text-[10px] md:text-xs font-mono font-medium group-hover:text-slate-300 transition-colors line-clamp-1 md:line-clamp-none">
//                     {item.desc}
//                 </p>
//             </div>

//             <div className={`absolute bottom-0 right-0 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-tl ${item.color} opacity-5 rounded-tl-3xl group-hover:opacity-10 transition-opacity`}></div>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default DashboardMenu;








// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, 
//   FaHistory, FaWhatsapp, FaVideo, FaHeadset, FaFeatherAlt 
// } from "react-icons/fa";

// // Variants for staggered animation
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1
//     }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 }
// };

// const DashboardMenu = ({ userName, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "my_complaints",
//       title: "My Reported Crimes",
//       desc: "View case history and status reports.",
//       icon: <FaHistory />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true,
//       path: "/user/history" 
//     },
//     {
//       id: "notices",
//       title: "Official Notices",
//       desc: "View legal notices from Police.",
//       icon: <FaFeatherAlt />, 
//       color: "from-amber-600 to-yellow-500",
//       isRoute: false
//     },
//     {
//       id: "report",
//       title: "Report a Crime",
//       desc: "File a complaint for theft, harassment, or cyber crime.",
//       icon: <FaUserShield />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/user/report" 
//     },
//     {
//       id: "meetings", 
//       title: "Online Meetings", 
//       desc: "Join scheduled video inquiries.",
//       icon: <FaVideo />, 
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/user/meetings" 
//     },
//     {
//       id: "police_connect",
//       title: "Police Connect",
//       desc: "Chat with Investigating Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/user/messages" 
//     },
//     {
//       id: "emergency",
//       title: "Emergency SOS",
//       desc: "Trigger immediate alert to nearest PCR.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isRoute: false
//     },
//     {
//       id: "status",
//       title: "Track Status",
//       desc: "Check progress of your FIR/Complaint.",
//       icon: <FaSearch />,
//       color: "from-purple-600 to-purple-400",
//       isRoute: true,
//       path: "/user/track"
//     },
//     {
//       id: "docs",
//       title: "Legal Docs",
//       desc: "Download forms and legal awareness PDFs.",
//       icon: <FaFileContract />,
//       color: "from-orange-600 to-orange-400"
//     },
//     {
//       id: "support",
//       title: "Help & Support",
//       desc: "Raise tickets, reviews & suggestions.",
//       icon: <FaHeadset />,
//       color: "from-pink-600 to-rose-400",
//       isRoute: false
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) {
//           navigate(item.path); 
//       } else {
//           setActiveTab(item.id);
//       }
//   };

//   return (
//     // ✅ MAIN CONTAINER: h-full aur flex-col taaki available height le le
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="h-full flex flex-col space-y-4 pb-2"
//     >
      
//       {/* --- HEADER SECTION --- */}
//       <motion.div 
//         variants={itemVariants}
//         className="shrink-0 relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-xl overflow-hidden"
//       >
//         <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl transition-all duration-500"></div>

//         <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
            
//             <div className="order-first md:order-last p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
//                 <img 
//                     src="/Chandrapur_Police.png" 
//                     alt="Logo" 
//                     className="h-16 w-auto md:h-24 object-contain drop-shadow-2xl" 
//                 />
//             </div>

//             <div className="w-full md:w-auto text-center md:text-left">
//                 <h1 className="text-2xl md:text-4xl font-black text-white mb-1 leading-tight tracking-tight">
//                     Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{userName || "Citizen"}</span>
//                 </h1>
//                 <p className="text-[10px] md:text-sm text-slate-400 font-mono flex items-center justify-center md:justify-start gap-2">
//                     <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
//                     System Operational • Secure Active
//                 </p>
//             </div>

//         </div>
//       </motion.div>

//       {/* --- MENU GRID --- */}
//       {/* ✅ FLEX-1 & OVERFLOW-AUTO: Bachi hui height lega aur zaroorat padne par hi scroll karega, lekin hum koshish karenge fit ho jaye */}
//       <div className="flex-1 min-h-0">
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 h-full">
//             {menuItems.map((item) => (
//               <motion.div 
//                 key={item.id}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleItemClick(item)} 
//                 // ✅ h-full: Grid items ko stretch karke fill karega
//                 className={`
//                     relative p-3 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
//                     bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-xl
//                     hover:border-opacity-100 hover:shadow-2xl flex flex-col justify-center
//                     ${item.isDanger 
//                         ? 'hover:border-red-500/50 hover:shadow-red-900/20' 
//                         : 'hover:border-blue-500/50 hover:shadow-blue-900/20'
//                     }
//                 `}
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
//                 <div className="flex flex-col md:flex-row items-start justify-between mb-2 relative z-10 shrink-0">
//                     <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm md:text-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-1 md:mb-0`}>
//                         {item.icon}
//                     </div>
//                     {item.isDanger && (
//                         <span className="bg-red-500/20 text-red-400 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/30 animate-pulse absolute top-0 right-0 md:relative">
//                             SOS
//                         </span>
//                     )}
//                 </div>
                
//                 <div className="relative z-10 flex-1 flex flex-col justify-center">
//                     <h3 className={`text-xs md:text-lg font-black tracking-wide mb-0.5 transition-colors line-clamp-1 ${item.isDanger ? 'text-white group-hover:text-red-400' : 'text-white group-hover:text-blue-300'}`}>
//                         {item.title}
//                     </h3>
//                     <p className="text-slate-400 text-[9px] md:text-xs font-mono font-medium group-hover:text-slate-300 transition-colors line-clamp-2 leading-tight">
//                         {item.desc}
//                     </p>
//                 </div>

//                 <div className={`absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-tl ${item.color} opacity-5 rounded-tl-3xl group-hover:opacity-10 transition-opacity`}></div>
//               </motion.div>
//             ))}
//           </div>
//       </div>
//     </motion.div>
//   );
// };

// export default DashboardMenu;







import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; // ✅ Added for API
import { 
  FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, 
  FaHistory, FaWhatsapp, FaVideo, FaHeadset, FaFeatherAlt,
  FaBroadcastTower, FaSatelliteDish // ✅ Added Icons for Widget
} from "react-icons/fa";

const ENDPOINT = "https://crimetrack-api.onrender.com";

// --- HELPER: HAVERSINE FORMULA (Distance Calculation) ---
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of earth in km
    const dLat = (lat2 - lat1) * (Math.PI/180);
    const dLon = (lon2 - lon1) * (Math.PI/180);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * (Math.PI/180)) * Math.cos(lat2 * (Math.PI/180)) * Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const d = R * c; 
    return d.toFixed(1); 
};

// Variants for staggered animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const DashboardMenu = ({ userName, setActiveTab }) => {
  const navigate = useNavigate(); 

  // ✅ NEW STATE: NEAREST STATION & GPS
  const [nearestStation, setNearestStation] = useState(null); 
  const [gpsActive, setGpsActive] = useState(false);

  // ✅ NEW: LIVE LOCATION LOGIC (Updates every 4s)
  useEffect(() => {
    let intervalId;

    const updateNearestStation = async () => {
        try {
            // 1. Get Stations
            const { data } = await axios.get(`${ENDPOINT}/api/metadata/all`);
            const rawStations = data.stations || [];
            if (rawStations.length === 0) return;

            // 2. Get User Location
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        setGpsActive(true);
                        const { latitude, longitude } = position.coords;

                        // 3. Find Minimum Distance
                        let minDistance = Infinity;
                        let closest = null;

                        rawStations.forEach(st => {
                            if (st.location && st.location.lat && st.location.lng) {
                                const dist = parseFloat(calculateDistance(latitude, longitude, parseFloat(st.location.lat), parseFloat(st.location.lng)));
                                if (dist < minDistance) {
                                    minDistance = dist;
                                    closest = st;
                                }
                            }
                        });

                        // 4. Update State
                        if (closest) {
                            setNearestStation({ name: closest.name, distance: minDistance.toFixed(1) });
                        }
                    },
                    (err) => { setGpsActive(false); console.warn("GPS Error"); },
                    { enableHighAccuracy: true }
                );
            }
        } catch (error) { console.error("Station Sync Error", error); }
    };

    updateNearestStation();
    intervalId = setInterval(updateNearestStation, 4000); // 4 Seconds Update

    return () => clearInterval(intervalId);
  }, []);

  const menuItems = [
    {
      id: "my_complaints",
      title: "My Reported Crimes",
      desc: "View case history and status reports.",
      icon: <FaHistory />,
      color: "from-indigo-600 to-indigo-400",
      isRoute: true,
      path: "/user/history" 
    },
    {
      id: "notices",
      title: "Official Notices",
      desc: "View legal notices from Police.",
      icon: <FaFeatherAlt />, 
      color: "from-amber-600 to-yellow-500",
      isRoute: false
    },
    {
      id: "report",
      title: "Report a Crime",
      desc: "File a complaint for theft, harassment, or cyber crime.",
      icon: <FaUserShield />,
      color: "from-blue-600 to-blue-400",
      isRoute: true,
      path: "/user/report" 
    },
    {
      id: "meetings", 
      title: "Online Meetings", 
      desc: "Join scheduled video inquiries.",
      icon: <FaVideo />, 
      color: "from-cyan-600 to-cyan-400",
      isRoute: true,
      path: "/user/meetings" 
    },
    {
      id: "police_connect",
      title: "Police Connect",
      desc: "Chat with Investigating Officers",
      icon: <FaWhatsapp />,
      color: "from-emerald-600 to-teal-400",
      isRoute: true, 
      path: "/user/messages" 
    },
    {
      id: "emergency",
      title: "Emergency SOS",
      desc: "Trigger immediate alert to nearest PCR.",
      icon: <FaExclamationTriangle />,
      color: "from-red-600 to-red-500",
      isRoute: false
    },
    {
      id: "status",
      title: "Track Status",
      desc: "Check progress of your FIR/Complaint.",
      icon: <FaSearch />,
      color: "from-purple-600 to-purple-400",
      isRoute: true,
      path: "/user/track"
    },
    {
      id: "docs",
      title: "Legal Docs",
      desc: "Download forms and legal awareness PDFs.",
      icon: <FaFileContract />,
      color: "from-orange-600 to-orange-400"
    },
    {
      id: "support",
      title: "Help & Support",
      desc: "Raise tickets, reviews & suggestions.",
      icon: <FaHeadset />,
      color: "from-pink-600 to-rose-400",
      isRoute: false
    }
  ];

  const handleItemClick = (item) => {
      if (item.isRoute) {
          navigate(item.path); 
      } else {
          setActiveTab(item.id);
      }
  };

  return (
    // ✅ FIX: Mobile par 'h-auto' (scrolling allowed), Desktop par 'md:h-full' (fit to screen)
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col space-y-4 pb-10 md:h-full md:pb-2"
    >
      
      {/* --- HEADER SECTION --- */}
      <motion.div 
        variants={itemVariants}
        className="shrink-0 relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl transition-all duration-500"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 relative z-10">
            
            {/* 1. Welcome Text (Left) */}
            <div className="w-full md:w-auto text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-black text-white mb-1 leading-tight tracking-tight">
                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{userName || "Citizen"}</span>
                </h1>
                <p className="text-[10px] md:text-sm text-slate-400 font-mono flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
                    System Operational • Secure Active
                </p>
            </div>

            {/* ✅ 2. CENTER: LIVE NEAREST STATION WIDGET (ADDED HERE) */}
            <div className="w-full md:flex-1 flex justify-center">
                <div className="bg-black/40 border border-blue-500/30 px-6 py-2 rounded-2xl flex items-center gap-4 relative group hover:border-blue-400/60 transition-all w-full md:w-auto justify-center md:justify-start">
                    {/* Radar Icon */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20"></div>
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center shadow-lg">
                            <FaBroadcastTower className="text-white text-lg" />
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="text-[9px] text-cyan-300 uppercase font-bold tracking-widest flex items-center gap-1">
                            {gpsActive ? <><FaSatelliteDish className="animate-pulse text-[8px]"/> Live Tracking</> : "Locating..."}
                        </p>
                        
                        <AnimatePresence mode="wait">
                            {nearestStation ? (
                                <motion.div 
                                    key="station-data"
                                    initial={{ opacity: 0, y: 5 }} 
                                    animate={{ opacity: 1, y: 0 }}
                                    className="leading-tight"
                                >
                                    <h3 className="text-white font-bold text-base md:text-lg truncate max-w-[200px]">
                                        {nearestStation.name}
                                    </h3>
                                    <p className="text-slate-400 text-[10px] font-mono">
                                        <span className="text-yellow-400 font-bold">{nearestStation.distance} km</span> away
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.p key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-500 text-xs font-bold">
                                    Scanning Area...
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* 3. Logo (Right) */}
            <div className="order-first md:order-last p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                <img 
                    src="/Chandrapur_Police.png" 
                    alt="Logo" 
                    className="h-16 w-auto md:h-24 object-contain drop-shadow-2xl" 
                />
            </div>

        </div>
      </motion.div>

      {/* --- MENU GRID --- */}
      {/* ✅ FIX: Mobile par normal flow (scrolling enabled). Desktop par 'md:flex-1' (fill remaining space) */}
      <div className="md:flex-1 md:min-h-0">
          {/* ✅ FIX: Mobile par 'h-auto'. Desktop par 'md:h-full' */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:h-full">
            {menuItems.map((item) => (
              <motion.div 
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleItemClick(item)} 
                className={`
                    relative p-3 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
                    bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-xl
                    hover:border-opacity-100 hover:shadow-2xl flex flex-col justify-center
                    ${item.isDanger 
                        ? 'hover:border-red-500/50 hover:shadow-red-900/20' 
                        : 'hover:border-blue-500/50 hover:shadow-blue-900/20'
                    }
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="flex flex-col md:flex-row items-start justify-between mb-2 relative z-10 shrink-0">
                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm md:text-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-1 md:mb-0`}>
                        {item.icon}
                    </div>
                    {item.isDanger && (
                        <span className="bg-red-500/20 text-red-400 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/30 animate-pulse absolute top-0 right-0 md:relative">
                            SOS
                        </span>
                    )}
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <h3 className={`text-xs md:text-lg font-black tracking-wide mb-0.5 transition-colors line-clamp-1 ${item.isDanger ? 'text-white group-hover:text-red-400' : 'text-white group-hover:text-blue-300'}`}>
                        {item.title}
                    </h3>
                    <p className="text-slate-400 text-[9px] md:text-xs font-mono font-medium group-hover:text-slate-300 transition-colors line-clamp-2 leading-tight">
                        {item.desc}
                    </p>
                </div>

                <div className={`absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-tl ${item.color} opacity-5 rounded-tl-3xl group-hover:opacity-10 transition-opacity`}></div>
              </motion.div>
            ))}
          </div>
      </div>
    </motion.div>
  );
};

export default DashboardMenu;