
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { 
//   FaFileAlt, FaGavel, FaHistory, FaVideo, FaUserTag, FaExclamationTriangle, FaWhatsapp, FaUserFriends
// } from "react-icons/fa";

// const PoliceMenu = ({ user, setActiveTab, hasNewSOS }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       id: "emergency", 
//       title: hasNewSOS ? "🚨 SOS ACTIVE!" : "Emergency Alerts",
//       desc: hasNewSOS ? "CLICK IMMEDIATELY" : "SOS & Distress Signals",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isEmergencyCard: true,
//       priority: true 
//     },
//     {
//       id: "complaints", 
//       title: "View Complaints",
//       desc: "Manage & Update Status",
//       icon: <FaFileAlt />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true, 
//       path: "/police/complaints"
//     },
//     {
//       id: "fir", 
//       title: "File FIR / NCR",
//       desc: "Official Record Entry",
//       icon: <FaGavel />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "connect", 
//       title: "Police Connect",
//       desc: "Secure Dept. Chat",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true,
//       path: "/police/connect"
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Chat with Public",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/police/citizen-connect"
//     },
//     {
//       id: "history", 
//       title: "Criminal History",
//       desc: "Past Records & Convicts",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
//     },
//     {
//       id: "cctv", 
//       title: "Surveillance",
//       desc: "CCTV & Suspicious Activity",
//       icon: <FaVideo />,
//       color: "from-yellow-600 to-yellow-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "face", 
//       title: "Face Detection",
//       desc: "Identify Suspects",
//       icon: <FaUserTag />,
//       color: "from-indigo-600 to-indigo-400",
//        isRoute: true, 
//       path: "/coming-soon"
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
      
//       {/* Responsive Welcome Header */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center">
        
//         {/* Text Section */}
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, Officer <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Station Jurisdiction: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.station || "Central HQ"}</span>
//           </p>
//         </div>
        
//         {/* ✅ LOGO FIXED: Cleaned up the className syntax error */}
//                <img 
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
//         {menuItems.map((item) => {
//             const isBlinking = item.isEmergencyCard && hasNewSOS;
//             return (
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 key={item.id}
//                 onClick={() => handleItemClick(item)}
//                 className={`
//                     p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                     ${isBlinking
//                         ? "bg-red-600 border-4 border-yellow-400 animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.9)] z-50 order-first" 
//                         : "bg-gray-800 border border-gray-700 hover:shadow-2xl"
//                     }
//                 `}
//               >
//                 {/* Background Decoration */}
//                 <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
                
//                 {/* Icon */}
//                 <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//                   {item.icon}
//                 </div>
                
//                 {/* Text Content */}
//                 <div className="flex-1">
//                     <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${isBlinking ? "text-white uppercase tracking-widest font-black" : "text-white group-hover:text-blue-400"}`}>
//                         {item.title}
//                     </h3>
//                     <p className={`${isBlinking ? "text-yellow-200 font-bold" : "text-gray-400 text-xs md:text-sm"}`}>
//                         {item.desc}
//                     </p>
//                 </div>
                
//                 {/* Emergency Animation Effects */}
//                 {isBlinking && (
//                     <>
//                         <span className="absolute top-4 right-4 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-ping"></span>
//                         <div className="absolute inset-0 border-4 border-red-500 rounded-xl animate-pulse pointer-events-none"></div>
//                     </>
//                 )}
//               </motion.div>
//             )
//         })}
//       </div>
//     </div>
//   );
// };

// export default PoliceMenu;























// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { 
//   FaFileAlt, FaGavel, FaHistory, FaVideo, FaUserTag, FaExclamationTriangle, FaWhatsapp, FaUserFriends, FaLaptop
// } from "react-icons/fa";

// const PoliceMenu = ({ user, setActiveTab, hasNewSOS }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       id: "emergency", 
//       title: hasNewSOS ? "🚨 SOS ACTIVE!" : "Emergency Alerts",
//       desc: hasNewSOS ? "CLICK IMMEDIATELY" : "SOS & Distress Signals",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isEmergencyCard: true,
//       priority: true 
//     },
//     {
//       id: "complaints", 
//       title: "View Complaints",
//       desc: "Manage & Update Status",
//       icon: <FaFileAlt />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true, 
//       path: "/police/complaints"
//     },
//     {
//       id: "fir", 
//       title: "File FIR / NCR",
//       desc: "Official Record Entry",
//       icon: <FaGavel />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "meeting", 
//       title: "Online Meeting",
//       desc: "Video Conference & Inquiries",
//       icon: <FaLaptop />,
//       color: "from-indigo-600 to-blue-500",
//       isRoute: true,
//       path: "/police/online-meeting"
//     },
//     {
//       id: "connect", 
//       title: "Police Connect",
//       desc: "Secure Dept. Chat",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true,
//       path: "/police/connect"
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Chat with Public",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/police/citizen-connect"
//     },
//     {
//       id: "history", 
//       title: "Criminal History",
//       desc: "Past Records & Convicts",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
//     },
//     {
//       id: "cctv", 
//       title: "Surveillance",
//       desc: "CCTV & Suspicious Activity",
//       icon: <FaVideo />,
//       color: "from-yellow-600 to-yellow-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "face", 
//       title: "Face Detection",
//       desc: "Identify Suspects",
//       icon: <FaUserTag />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true, 
//       path: "/coming-soon"
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
      
//       {/* Responsive Welcome Header */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center">
        
//         {/* Text Section */}
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, Officer <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Station Jurisdiction: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.station || "Central HQ"}</span>
//           </p>
//         </div>
        
//         {/* ✅ LOGO FIXED */}
//         <img 
//             src="/Chandrapur_Police.png" 
//             alt="Logo" 
//             className="
//                 absolute 
//                 top-1/2 right-4 -translate-y-1/2 
//                 h-35 w-35 
//                 opacity-80 
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
//         {menuItems.map((item) => {
//             const isBlinking = item.isEmergencyCard && hasNewSOS;
//             return (
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 key={item.id}
//                 onClick={() => handleItemClick(item)}
//                 className={`
//                     p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                     ${isBlinking
//                         ? "bg-red-600 border-4 border-yellow-400 animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.9)] z-50 order-first" 
//                         : "bg-gray-800 border border-gray-700 hover:shadow-2xl"
//                     }
//                 `}
//               >
//                 {/* Background Decoration */}
//                 <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
                
//                 {/* Icon */}
//                 <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//                   {item.icon}
//                 </div>
                
//                 {/* Text Content */}
//                 <div className="flex-1">
//                     <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${isBlinking ? "text-white uppercase tracking-widest font-black" : "text-white group-hover:text-blue-400"}`}>
//                         {item.title}
//                     </h3>
//                     <p className={`${isBlinking ? "text-yellow-200 font-bold" : "text-gray-400 text-xs md:text-sm"}`}>
//                         {item.desc}
//                     </p>
//                 </div>
                
//                 {/* Emergency Animation Effects */}
//                 {isBlinking && (
//                     <>
//                         <span className="absolute top-4 right-4 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-ping"></span>
//                         <div className="absolute inset-0 border-4 border-red-500 rounded-xl animate-pulse pointer-events-none"></div>
//                     </>
//                 )}
//               </motion.div>
//             )
//         })}
//       </div>
//     </div>
//   );
// };

// export default PoliceMenu;








// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { 
//   FaFileAlt, FaGavel, FaHistory, FaVideo, FaUserTag, FaExclamationTriangle, 
//   FaWhatsapp, FaUserFriends, FaLaptop, FaHeadset // ✅ Import FaHeadset
// } from "react-icons/fa";

// const PoliceMenu = ({ user, setActiveTab, hasNewSOS }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       id: "emergency", 
//       title: hasNewSOS ? "🚨 SOS ACTIVE!" : "Emergency Alerts",
//       desc: hasNewSOS ? "CLICK IMMEDIATELY" : "SOS & Distress Signals",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isEmergencyCard: true,
//       priority: true 
//     },
//     {
//       id: "complaints", 
//       title: "View Complaints",
//       desc: "Manage & Update Status",
//       icon: <FaFileAlt />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true, 
//       path: "/police/complaints"
//     },
//     {
//       id: "fir", 
//       title: "File FIR / NCR",
//       desc: "Official Record Entry",
//       icon: <FaGavel />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "meeting", 
//       title: "Online Meeting",
//       desc: "Video Conference & Inquiries",
//       icon: <FaLaptop />,
//       color: "from-indigo-600 to-blue-500",
//       isRoute: true,
//       path: "/police/online-meeting"
//     },
//     {
//   id: "notices",
//   title: "Notices & Circulars",
//   desc: "Send official orders/notices.",
//   icon: <FaFeatherAlt />, 
//   color: "from-amber-600 to-yellow-500"
// },
//     {
//       id: "connect", 
//       title: "Police Connect",
//       desc: "Secure Dept. Chat",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true,
//       path: "/police/connect"
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Chat with Public",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/police/citizen-connect"
//     },
//     {
//       id: "history", 
//       title: "Criminal History",
//       desc: "Past Records & Convicts",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
//     },
//     {
//       id: "cctv", 
//       title: "Surveillance",
//       desc: "CCTV & Suspicious Activity",
//       icon: <FaVideo />,
//       color: "from-yellow-600 to-yellow-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "face", 
//       title: "Face Detection",
//       desc: "Identify Suspects",
//       icon: <FaUserTag />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     // ✅ ADDED HELP DESK
//     {
//       id: "support",
//       title: "Help Desk",
//       desc: "Report System Issues",
//       icon: <FaHeadset />,
//       color: "from-gray-600 to-slate-500"
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
      
//       {/* Responsive Welcome Header */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center">
        
//         {/* Text Section */}
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, Officer <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Station Jurisdiction: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.station || "Central HQ"}</span>
//           </p>
//         </div>
        
//         {/* ✅ LOGO FIXED */}
//         <img 
//             src="/Chandrapur_Police.png" 
//             alt="Logo" 
//             className="absolute top-1/2 right-4 -translate-y-1/2 h-35 w-35 opacity-80 md:top-1/2 md:right-10 md:-translate-y-1/2 md:h-[95%] md:w-auto md:max-w-[200px] md:opacity-100 object-contain pointer-events-none drop-shadow-lg transition-all duration-300" 
//         />
//       </div>

//       {/* Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//         {menuItems.map((item) => {
//             const isBlinking = item.isEmergencyCard && hasNewSOS;
//             return (
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 key={item.id}
//                 onClick={() => handleItemClick(item)}
//                 className={`
//                     p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                     ${isBlinking
//                         ? "bg-red-600 border-4 border-yellow-400 animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.9)] z-50 order-first" 
//                         : "bg-gray-800 border border-gray-700 hover:shadow-2xl"
//                     }
//                 `}
//               >
//                 <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
                
//                 <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//                   {item.icon}
//                 </div>
                
//                 <div className="flex-1">
//                     <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${isBlinking ? "text-white uppercase tracking-widest font-black" : "text-white group-hover:text-blue-400"}`}>
//                         {item.title}
//                     </h3>
//                     <p className={`${isBlinking ? "text-yellow-200 font-bold" : "text-gray-400 text-xs md:text-sm"}`}>
//                         {item.desc}
//                     </p>
//                 </div>
                
//                 {isBlinking && (
//                     <>
//                         <span className="absolute top-4 right-4 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-ping"></span>
//                         <div className="absolute inset-0 border-4 border-red-500 rounded-xl animate-pulse pointer-events-none"></div>
//                     </>
//                 )}
//               </motion.div>
//             )
//         })}
//       </div>
//     </div>
//   );
// };

// export default PoliceMenu;















// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { 
//   FaFileAlt, FaGavel, FaHistory, FaVideo, FaUserTag, FaExclamationTriangle, 
//   FaWhatsapp, FaUserFriends, FaLaptop, FaHeadset, FaFeatherAlt // ✅ Imported FaFeatherAlt
// } from "react-icons/fa";

// const PoliceMenu = ({ user, setActiveTab, hasNewSOS }) => {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       id: "emergency", 
//       title: hasNewSOS ? "🚨 SOS ACTIVE!" : "Emergency Alerts",
//       desc: hasNewSOS ? "CLICK IMMEDIATELY" : "SOS & Distress Signals",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-red-500",
//       isEmergencyCard: true,
//       priority: true 
//     },
//     {
//       id: "complaints", 
//       title: "View Complaints",
//       desc: "Manage & Update Status",
//       icon: <FaFileAlt />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true, 
//       path: "/police/complaints"
//     },
//     // ✅ OFFICIAL NOTICES (New Feature)
//     {
//       id: "notices",
//       title: "Notices & Circulars",
//       desc: "Send official orders/notices.",
//       icon: <FaFeatherAlt />, 
//       color: "from-amber-600 to-yellow-500"
//     },
//     {
//       id: "fir", 
//       title: "File FIR / NCR",
//       desc: "Official Record Entry",
//       icon: <FaGavel />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "meeting", 
//       title: "Online Meeting",
//       desc: "Video Conference & Inquiries",
//       icon: <FaLaptop />,
//       color: "from-indigo-600 to-blue-500",
//       isRoute: true,
//       path: "/police/online-meeting"
//     },
//     {
//       id: "connect", 
//       title: "Police Connect",
//       desc: "Secure Dept. Chat",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true,
//       path: "/police/connect"
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Chat with Public",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/police/citizen-connect"
//     },
//     {
//       id: "history", 
//       title: "Criminal History",
//       desc: "Past Records & Convicts",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
//     },
//     {
//       id: "cctv", 
//       title: "Surveillance",
//       desc: "CCTV & Suspicious Activity",
//       icon: <FaVideo />,
//       color: "from-yellow-600 to-yellow-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "face", 
//       title: "Face Detection",
//       desc: "Identify Suspects",
//       icon: <FaUserTag />,
//       color: "from-indigo-600 to-indigo-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "support",
//       title: "Help Desk",
//       desc: "Report System Issues",
//       icon: <FaHeadset />,
//       color: "from-gray-600 to-slate-500"
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
      
//       {/* Header */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center">
//         <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, Officer <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Station Jurisdiction: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.station || "Central HQ"}</span>
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
//         {menuItems.map((item) => {
//             const isBlinking = item.isEmergencyCard && hasNewSOS;
//             return (
//               <motion.div 
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 key={item.id}
//                 onClick={() => handleItemClick(item)}
//                 className={`
//                     p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
//                     ${isBlinking
//                         ? "bg-red-600 border-4 border-yellow-400 animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.9)] z-50 order-first" 
//                         : "bg-gray-800 border border-gray-700 hover:shadow-2xl"
//                     }
//                 `}
//               >
//                 <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
                
//                 <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//                   {item.icon}
//                 </div>
                
//                 <div className="flex-1">
//                     <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${isBlinking ? "text-white uppercase tracking-widest font-black" : "text-white group-hover:text-blue-400"}`}>
//                         {item.title}
//                     </h3>
//                     <p className={`${isBlinking ? "text-yellow-200 font-bold" : "text-gray-400 text-xs md:text-sm"}`}>
//                         {item.desc}
//                     </p>
//                 </div>
                
//                 {isBlinking && (
//                     <>
//                         <span className="absolute top-4 right-4 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-ping"></span>
//                         <div className="absolute inset-0 border-4 border-red-500 rounded-xl animate-pulse pointer-events-none"></div>
//                     </>
//                 )}
//               </motion.div>
//             )
//         })}
//       </div>
//     </div>
//   );
// };

// export default PoliceMenu;










// import React from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaExclamationTriangle, FaFileAlt, FaPenFancy, FaHistory, 
//   FaNetworkWired, FaVideo, FaUserTag, FaHeadset, FaFeatherAlt
// } from "react-icons/fa";

// // Variants
// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.1 }
//   }
// };

// const itemVariants = {
//   hidden: { y: 20, opacity: 0 },
//   visible: { y: 0, opacity: 1 }
// };

// const PoliceMenu = ({ user, setActiveTab, hasNewSOS }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "complaints",
//       title: "View Complaints",
//       desc: "Check active complaints.",
//       icon: <FaFileAlt />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/police/complaints"
//     },
//     {
//       id: "fir",
//       title: "File FIR",
//       desc: "Register new FIR entry.",
//       icon: <FaPenFancy />,
//       color: "from-green-600 to-emerald-400",
//       isRoute: true,
//       path: "/file-fir"
//     },
//     {
//       id: "emergency",
//       title: "Emergency Alerts",
//       desc: hasNewSOS ? "🚨 SOS ACTIVE - CHECK NOW" : "Monitor SOS signals.",
//       icon: <FaExclamationTriangle />,
//       color: "from-red-600 to-rose-500",
//       isDanger: true
//     },
//     {
//       id: "history",
//       title: "Crime History",
//       desc: "Past records database.",
//       icon: <FaHistory />,
//       color: "from-gray-600 to-slate-400"
//     },
//     {
//       id: "connect",
//       title: "Station Connect",
//       desc: "Chat with HQ & Officers.",
//       icon: <FaNetworkWired />,
//       color: "from-purple-600 to-indigo-400"
//     },
//     {
//       id: "meeting",
//       title: "Online Meetings",
//       desc: "Join scheduled briefings.",
//       icon: <FaVideo />,
//       color: "from-cyan-600 to-sky-400",
//       isRoute: true,
//       path: "/police/meeting/list"
//     },
//     {
//       id: "notices",
//       title: "Notices & Orders",
//       desc: "Legal circulars.",
//       icon: <FaFeatherAlt />, 
//       color: "from-yellow-600 to-amber-400",
//       isRoute: false
//     },
//     {
//       id: "cctv",
//       title: "CCTV Feed",
//       desc: "Live surveillance.",
//       icon: <FaVideo />,
//       color: "from-pink-600 to-fuchsia-400"
//     },
//     {
//       id: "face",
//       title: "Face Recognition",
//       desc: "Identify suspects.",
//       icon: <FaUserTag />,
//       color: "from-indigo-600 to-blue-500"
//     }
//   ];

//   const handleItemClick = (item) => {
//       if (item.isRoute) { navigate(item.path); } else { setActiveTab(item.id); }
//   };

//   return (
//     <motion.div 
//       initial="hidden"
//       animate="visible"
//       variants={containerVariants}
//       className="flex flex-col space-y-4 pb-10 md:h-full md:pb-2"
//     >
      
//       {/* --- HEADER --- */}
//       <motion.div 
//         variants={itemVariants}
//         className={`shrink-0 relative bg-slate-900/95 backdrop-blur-xl border p-4 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 
//             ${hasNewSOS ? 'border-red-500/50 shadow-red-900/50 animate-pulse' : 'border-slate-700/50'}`}
//       >
//         <div className={`absolute -top-24 -left-24 w-48 h-48 rounded-full blur-3xl transition-all duration-500 ${hasNewSOS ? 'bg-red-500/30' : 'bg-purple-500/10'}`}></div>

//         <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
//             <div className="order-first md:order-last p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
//                 <img src="/Chandrapur_Police.png" alt="Logo" className="h-16 w-auto md:h-24 object-contain drop-shadow-2xl" />
//             </div>
//             <div className="w-full md:w-auto text-center md:text-left">
//                 <h1 className="text-2xl md:text-4xl font-black text-white mb-1 leading-tight tracking-tight uppercase">
//                     Station <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">Portal</span>
//                 </h1>
//                 <p className="text-[10px] md:text-sm text-slate-400 font-mono flex items-center justify-center md:justify-start gap-2">
//                     <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px] ${hasNewSOS ? 'bg-red-500 shadow-red-500' : 'bg-purple-500 shadow-purple-500'}`}></span>
//                     {user.designation} • {user.station}
//                 </p>
//             </div>
//         </div>
//       </motion.div>

//       {/* --- MENU GRID --- */}
//       <div className="md:flex-1 md:min-h-0">
//           <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:h-full">
//             {menuItems.map((item) => (
//               <motion.div 
//                 key={item.id}
//                 variants={itemVariants}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 onClick={() => handleItemClick(item)} 
//                 className={`
//                     relative p-3 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
//                     bg-slate-900/60 backdrop-blur-md border border-slate-700/50 shadow-xl
//                     hover:border-opacity-100 hover:shadow-2xl flex flex-col justify-center
//                     ${item.isDanger || (item.id === 'emergency' && hasNewSOS)
//                         ? 'hover:border-red-500/50 hover:shadow-red-900/20 bg-red-900/10 animate-pulse border-red-500/30 ring-2 ring-red-500/20' 
//                         : 'hover:border-purple-500/50 hover:shadow-purple-900/20'
//                     }
//                 `}
//               >
//                 <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
//                 <div className="flex flex-col md:flex-row items-start justify-between mb-2 relative z-10 shrink-0">
//                     <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm md:text-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-1 md:mb-0`}>
//                         {item.icon}
//                     </div>
//                     {(item.isDanger || (item.id === 'emergency' && hasNewSOS)) && (
//                         <span className="bg-red-500/20 text-red-400 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/30 animate-pulse absolute top-0 right-0 md:relative shadow-[0_0_10px_rgba(239,68,68,0.5)]">
//                             SOS ALERT
//                         </span>
//                     )}
//                 </div>
                
//                 <div className="relative z-10 flex-1 flex flex-col justify-center">
//                     <h3 className={`text-xs md:text-lg font-black tracking-wide mb-0.5 transition-colors line-clamp-1 ${item.isDanger ? 'text-white group-hover:text-red-400' : 'text-white group-hover:text-purple-300'}`}>
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

// export default PoliceMenu;










import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { 
  FaExclamationTriangle, FaFileAlt, FaPenFancy, FaHistory, 
  FaNetworkWired, FaVideo, FaUserTag, FaHeadset, FaFeatherAlt,
  FaUserFriends, FaLaptop, FaWhatsapp, FaGavel
} from "react-icons/fa";

// Variants for Staggered Animation
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const PoliceMenu = ({ user, setActiveTab, hasNewSOS }) => {
  const navigate = useNavigate(); 

  const menuItems = [
    {
      id: "emergency", 
      title: hasNewSOS ? "🚨 SOS ACTIVE!" : "EMERGENCY ALERTS",
      desc: hasNewSOS ? "CLICK IMMEDIATELY" : "Monitor SOS & Distress Signals",
      icon: <FaExclamationTriangle />,
      color: "from-red-600 to-rose-500",
      isEmergencyCard: true,
      priority: true,
      isDanger: true
    },
    {
      id: "complaints", 
      title: "VIEW COMPLAINTS",
      desc: "Manage & update case status.",
      icon: <FaFileAlt />,
      color: "from-blue-600 to-cyan-400",
      isRoute: true, 
      path: "/police/complaints"
    },
    {
      id: "notices",
      title: "NOTICES & ORDERS",
      desc: "Send official circulars.",
      icon: <FaFeatherAlt />, 
      color: "from-amber-500 to-yellow-400",
      isRoute: false
    },
    {
      id: "fir", 
      title: "FILE FIR / NCR",
      desc: "Official record entry portal.",
      icon: <FaGavel />,
      color: "from-green-600 to-emerald-400",
      isRoute: true,
      path: "/file-fir"
    },
    {
      id: "meeting", 
      title: "ONLINE MEETING",
      desc: "Video conference & inquiries.",
      icon: <FaLaptop />,
      color: "from-indigo-600 to-blue-500",
      isRoute: true,
      path: "/police/meeting/list"
    },
    {
      id: "connect", 
      title: "POLICE CONNECT",
      desc: "Secure department chat.",
      icon: <FaWhatsapp />,
      color: "from-emerald-600 to-teal-400",
      isRoute: true,
      path: "/police/connect"
    },
    {
      id: "citizen_connect", 
      title: "CITIZEN CONNECT",
      desc: "Direct public communication.",
      icon: <FaUserFriends />,
      color: "from-cyan-600 to-sky-400",
      isRoute: true,
      path: "/police/citizen-connect"
    },
    {
      id: "history", 
      title: "CRIMINAL HISTORY",
      desc: "Past records & convicts database.",
      icon: <FaHistory />,
      color: "from-purple-600 to-fuchsia-400"
    },
    {
      id: "cctv", 
      title: "SURVEILLANCE",
      desc: "Live CCTV feed monitoring.",
      icon: <FaVideo />,
      color: "from-pink-600 to-rose-400",
      isRoute: true, 
      path: "/coming-soon"
    },
    {
      id: "face", 
      title: "FACE DETECTION",
      desc: "AI-powered suspect ID.",
      icon: <FaUserTag />,
      color: "from-indigo-600 to-violet-500",
      isRoute: true, 
      path: "/coming-soon"
    },
    {
      id: "support",
      title: "HELP DESK",
      desc: "Report system issues.",
      icon: <FaHeadset />,
      color: "from-gray-600 to-slate-500"
    }
  ];

  const handleItemClick = (item) => {
      if (item.isRoute) { navigate(item.path); } else { setActiveTab(item.id); }
  };

  return (
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
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl transition-all duration-500"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
            <div className="order-first md:order-last p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                <img src="/Chandrapur_Police.png" alt="Logo" className="h-16 w-auto md:h-24 object-contain drop-shadow-2xl" />
            </div>
            <div className="w-full md:w-auto text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-black text-white mb-1 leading-tight tracking-tight">
                    Welcome, Officer <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">{user.name}</span>
                </h1>
                <p className="text-[10px] md:text-sm text-slate-400 font-mono flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]"></span>
                    Station: {user.station || "Central HQ"}
                </p>
            </div>
        </div>
      </motion.div>

      {/* --- MENU GRID --- */}
      <div className="md:flex-1 md:min-h-0">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:h-full">
            {menuItems.map((item) => {
              const isBlinking = item.isEmergencyCard && hasNewSOS;
              return (
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
                    ${isBlinking 
                        ? 'bg-red-900/20 border-red-500/80 shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-pulse z-50 order-first ring-2 ring-red-500' 
                        : 'hover:border-purple-500/50 hover:shadow-purple-900/20'
                    }
                `}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="flex flex-col md:flex-row items-start justify-between mb-2 relative z-10 shrink-0">
                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm md:text-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-1 md:mb-0`}>
                        {item.icon}
                    </div>
                    {isBlinking && (
                        <span className="bg-red-500/20 text-red-400 text-[8px] md:text-[10px] font-bold px-1.5 py-0.5 rounded border border-red-500/30 animate-pulse absolute top-0 right-0 md:relative shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                            SOS ACTIVE
                        </span>
                    )}
                </div>
                
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <h3 className={`text-xs md:text-lg font-black tracking-wide mb-0.5 transition-colors line-clamp-1 ${isBlinking ? 'text-red-400 uppercase tracking-widest' : 'text-white group-hover:text-purple-300'}`}>
                        {item.title}
                    </h3>
                    <p className={`text-[9px] md:text-xs font-mono font-medium transition-colors line-clamp-2 leading-tight ${isBlinking ? 'text-red-200 font-bold' : 'text-slate-400 group-hover:text-slate-300'}`}>
                        {item.desc}
                    </p>
                </div>

                <div className={`absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-tl ${item.color} opacity-5 rounded-tl-3xl group-hover:opacity-10 transition-opacity`}></div>
                
                {isBlinking && (
                    <div className="absolute inset-0 border-2 border-red-500 rounded-2xl animate-ping pointer-events-none opacity-50"></div>
                )}
              </motion.div>
            )})}
          </div>
      </div>
    </motion.div>
  );
};

export default PoliceMenu;