
// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";
// import { 
//   FaTasks, FaUsersCog, FaGavel, FaMapMarkedAlt, FaHistory, FaWhatsapp, FaUserFriends
// } from "react-icons/fa";

// const SeniorMenu = ({ user, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "complaints", 
//       title: "Review Complaints",
//       desc: "Oversee cases and assign officers.",
//       icon: <FaTasks />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/senior/complaints"
//     },
//     {
//       id: "connect", 
//       title: "Police Connect",
//       desc: "Direct Chat with Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/police/connect" 
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Public Communication",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/senior/citizen-connect"
//     },
//     {
//       id: "manage_officers", 
//       title: "Manage Officers",
//       desc: "Add, Remove or Update Police Staff.",
//       icon: <FaUsersCog />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "fir", 
//       title: "Approve FIRs",
//       desc: "Review pending First Information Reports.",
//       icon: <FaGavel />,
//       color: "from-red-600 to-red-400"
//     },
//     {
//       id: "track", 
//       title: "Live Tracking",
//       desc: "Monitor Patrol Units via GPS.",
//       icon: <FaMapMarkedAlt />,
//       color: "from-yellow-600 to-yellow-400",
//        isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "history", 
//       title: "Crime Analytics",
//       desc: "View crime trends and past records.",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
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
      
//       {/* Header Container */}
//       {/* Added min-h-[130px] to ensure desktop logo always has space */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
//         {/* Text Section */}
//         {/* pr-24 ensures text wraps before hitting the logo on mobile */}
//         <div className="relative z-10 w-full md:w-3/4 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Designation: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.designation || "Senior Official"}</span>
//           </p>
//         </div>
        
//         {/* ✅ LOGO FIXED */}
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
//                 md:h-[95%] md:w-auto  /* ✅ This fixes the overflow issue! */
//                 md:max-w-[180px]
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
//             `}
//           >
//             {/* Background Decoration */}
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             {/* Icon */}
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             {/* Text Content */}
//             <div className="flex-1">
//                 <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">
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

// export default SeniorMenu;


















// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";
// import { 
//   FaTasks, FaUsersCog, FaGavel, FaMapMarkedAlt, FaHistory, FaWhatsapp, FaUserFriends, FaLaptop
// } from "react-icons/fa";

// const SeniorMenu = ({ user, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "complaints", 
//       title: "Review Complaints",
//       desc: "Oversee cases and assign officers.",
//       icon: <FaTasks />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/senior/complaints"
//     },
//     {
//       id: "meeting", 
//       title: "Online Meeting",
//       desc: "Video Conference & Reviews",
//       icon: <FaLaptop />,
//       color: "from-indigo-600 to-blue-500",
//       isRoute: true,
//       path: "/senior/online-meeting"
//     },
//     {
//       id: "connect", 
//       title: "Police Connect",
//       desc: "Direct Chat with Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/police/connect" 
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Public Communication",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/senior/citizen-connect"
//     },
//     {
//       id: "manage_officers", 
//       title: "Manage Officers",
//       desc: "Add, Remove or Update Police Staff.",
//       icon: <FaUsersCog />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "fir", 
//       title: "Approve FIRs",
//       desc: "Review pending First Information Reports.",
//       icon: <FaGavel />,
//       color: "from-red-600 to-red-400"
//     },
//     {
//       id: "track", 
//       title: "Live Tracking",
//       desc: "Monitor Patrol Units via GPS.",
//       icon: <FaMapMarkedAlt />,
//       color: "from-yellow-600 to-yellow-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "history", 
//       title: "Crime Analytics",
//       desc: "View crime trends and past records.",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
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
      
//       {/* Header Container */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
//         {/* Text Section */}
//         <div className="relative z-10 w-full md:w-3/4 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Designation: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.designation || "Senior Official"}</span>
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
//                 md:max-w-[180px]
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
//             `}
//           >
//             {/* Background Decoration */}
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             {/* Icon */}
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             {/* Text Content */}
//             <div className="flex-1">
//                 <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">
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

// export default SeniorMenu;






// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";
// import { 
//   FaTasks, FaUsersCog, FaGavel, FaMapMarkedAlt, FaHistory, FaWhatsapp, 
//   FaUserFriends, FaLaptop, FaHeadset // ✅ Import Icon
// } from "react-icons/fa";

// const SeniorMenu = ({ user, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "complaints", 
//       title: "Review Complaints",
//       desc: "Oversee cases and assign officers.",
//       icon: <FaTasks />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/senior/complaints"
//     },
//     {
//       id: "meeting", 
//       title: "Online Meeting",
//       desc: "Video Conference & Reviews",
//       icon: <FaLaptop />,
//       color: "from-indigo-600 to-blue-500",
//       isRoute: true,
//       path: "/senior/online-meeting"
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
//       desc: "Direct Chat with Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/police/connect" 
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Public Communication",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/senior/citizen-connect"
//     },
//     {
//       id: "manage_officers", 
//       title: "Manage Officers",
//       desc: "Add, Remove or Update Police Staff.",
//       icon: <FaUsersCog />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "fir", 
//       title: "Approve FIRs",
//       desc: "Review pending First Information Reports.",
//       icon: <FaGavel />,
//       color: "from-red-600 to-red-400"
//     },
//     {
//       id: "track", 
//       title: "Live Tracking",
//       desc: "Monitor Patrol Units via GPS.",
//       icon: <FaMapMarkedAlt />,
//       color: "from-yellow-600 to-yellow-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "history", 
//       title: "Crime Analytics",
//       desc: "View crime trends and past records.",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
//     },
//     // ✅ ADDED TECH SUPPORT
//     {
//       id: "support",
//       title: "Tech Support",
//       desc: "System Feedback & Help",
//       icon: <FaHeadset />,
//       color: "from-pink-600 to-rose-400"
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
      
//       {/* Header Container */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
//         <div className="relative z-10 w-full md:w-3/4 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Designation: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.designation || "Senior Official"}</span>
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
//                 md:max-w-[180px]
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
//             `}
//           >
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             <div className="flex-1">
//                 <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">
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

// export default SeniorMenu;





import React from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { 
  FaTasks, FaUsersCog, FaGavel, FaMapMarkedAlt, FaHistory, FaWhatsapp, 
  FaUserFriends, FaLaptop, FaHeadset, FaFeatherAlt 
} from "react-icons/fa";

// Variants for Staggered Animation (Added for new UI)
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

const SeniorMenu = ({ user, setActiveTab }) => {
  const navigate = useNavigate(); 

  // --- YOUR EXACT MENU ITEMS ARRAY ---
  const menuItems = [
    {
      id: "complaints", 
      title: "Review Complaints",
      desc: "Oversee cases and assign officers.",
      icon: <FaTasks />,
      color: "from-blue-600 to-blue-400",
      isRoute: true,
      path: "/senior/complaints"
    },
    {
      id: "meeting", 
      title: "Online Meeting",
      desc: "Video Conference & Reviews",
      icon: <FaLaptop />,
      color: "from-indigo-600 to-blue-500",
      isRoute: true,
      path: "/senior/online-meeting"
    },
    {
      id: "notices",
      title: "Notices & Circulars",
      desc: "Send official orders/notices.",
      icon: <FaFeatherAlt />, 
      color: "from-amber-600 to-yellow-500"
    },
    {
      id: "connect", 
      title: "Police Connect",
      desc: "Direct Chat with Officers",
      icon: <FaWhatsapp />,
      color: "from-emerald-600 to-teal-400",
      isRoute: true, 
      path: "/police/connect" 
    },
    {
      id: "citizen_connect", 
      title: "Citizen Connect",
      desc: "Public Communication",
      icon: <FaUserFriends />,
      color: "from-cyan-600 to-cyan-400",
      isRoute: true,
      path: "/senior/citizen-connect"
    },
    {
      id: "manage_officers", 
      title: "Manage Officers",
      desc: "Add, Remove or Update Police Staff.",
      icon: <FaUsersCog />,
      color: "from-green-600 to-green-400"
    },
    {
      id: "fir", 
      title: "Approve FIRs",
      desc: "Review pending First Information Reports.",
      icon: <FaGavel />,
      color: "from-red-600 to-red-400"
    },
    {
      id: "track", 
      title: "Live Tracking",
      desc: "Monitor Patrol Units via GPS.",
      icon: <FaMapMarkedAlt />,
      color: "from-yellow-600 to-yellow-400",
      isRoute: true, 
      path: "/coming-soon"
    },
    {
      id: "history", 
      title: "Crime Analytics",
      desc: "View crime trends and past records.",
      icon: <FaHistory />,
      color: "from-purple-600 to-purple-400"
    },
    {
      id: "support",
      title: "Tech Support",
      desc: "System Feedback & Help",
      icon: <FaHeadset />,
      color: "from-pink-600 to-rose-400"
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
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col space-y-4 pb-10 md:h-full md:pb-2"
    >
      
      {/* --- HEADER SECTION (New Glassmorphism UI) --- */}
      <motion.div 
        variants={itemVariants}
        className="shrink-0 relative bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 p-4 rounded-2xl shadow-xl overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl transition-all duration-500"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 relative z-10">
            {/* Logo Section */}
            <div className="order-first md:order-last p-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-sm">
                <img src="/Chandrapur_Police.png" alt="Logo" className="h-16 w-auto md:h-24 object-contain drop-shadow-2xl" />
            </div>
            
            {/* Text Section */}
            <div className="w-full md:w-auto text-center md:text-left">
                <h1 className="text-2xl md:text-4xl font-black text-white mb-1 leading-tight tracking-tight uppercase">
                    Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">{user.name}</span>
                </h1>
                <p className="text-[10px] md:text-sm text-slate-400 font-mono flex items-center justify-center md:justify-start gap-2">
                    <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_#f59e0b]"></span>
                    {user.designation || "Senior Official"} • Authorized Access Only
                </p>
            </div>
        </div>
      </motion.div>

      {/* --- MENU GRID (New Glassmorphism UI) --- */}
      <div className="md:flex-1 md:min-h-0">
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
                    hover:border-amber-500/50 hover:shadow-amber-900/20
                `}
              >
                {/* Gradient Background (Hidden by default, shows on hover) */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                {/* Icon Section */}
                <div className="flex flex-col md:flex-row items-start justify-between mb-2 relative z-10 shrink-0">
                    <div className={`w-8 h-8 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-sm md:text-xl text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-1 md:mb-0`}>
                        {item.icon}
                    </div>
                </div>
                
                {/* Text Content */}
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <h3 className="text-xs md:text-lg font-black tracking-wide mb-0.5 transition-colors line-clamp-1 text-white group-hover:text-amber-300">
                        {item.title}
                    </h3>
                    <p className="text-slate-400 text-[9px] md:text-xs font-mono font-medium group-hover:text-slate-300 transition-colors line-clamp-2 leading-tight">
                        {item.desc}
                    </p>
                </div>

                {/* Corner Decoration */}
                <div className={`absolute bottom-0 right-0 w-8 h-8 md:w-16 md:h-16 bg-gradient-to-tl ${item.color} opacity-5 rounded-tl-3xl group-hover:opacity-10 transition-opacity`}></div>
              </motion.div>
            ))}
          </div>
      </div>
    </motion.div>
  );
};

export default SeniorMenu;










// import React from "react";
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";
// import { 
//   FaTasks, FaUsersCog, FaGavel, FaMapMarkedAlt, FaHistory, FaWhatsapp, 
//   FaUserFriends, FaLaptop, FaHeadset, FaFeatherAlt // ✅ Imported FaFeatherAlt
// } from "react-icons/fa";

// const SeniorMenu = ({ user, setActiveTab }) => {
//   const navigate = useNavigate(); 

//   const menuItems = [
//     {
//       id: "complaints", 
//       title: "Review Complaints",
//       desc: "Oversee cases and assign officers.",
//       icon: <FaTasks />,
//       color: "from-blue-600 to-blue-400",
//       isRoute: true,
//       path: "/senior/complaints"
//     },
//     {
//       id: "meeting", 
//       title: "Online Meeting",
//       desc: "Video Conference & Reviews",
//       icon: <FaLaptop />,
//       color: "from-indigo-600 to-blue-500",
//       isRoute: true,
//       path: "/senior/online-meeting"
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
//       id: "connect", 
//       title: "Police Connect",
//       desc: "Direct Chat with Officers",
//       icon: <FaWhatsapp />,
//       color: "from-emerald-600 to-teal-400",
//       isRoute: true, 
//       path: "/police/connect" 
//     },
//     {
//       id: "citizen_connect", 
//       title: "Citizen Connect",
//       desc: "Public Communication",
//       icon: <FaUserFriends />,
//       color: "from-cyan-600 to-cyan-400",
//       isRoute: true,
//       path: "/senior/citizen-connect"
//     },
//     {
//       id: "manage_officers", 
//       title: "Manage Officers",
//       desc: "Add, Remove or Update Police Staff.",
//       icon: <FaUsersCog />,
//       color: "from-green-600 to-green-400"
//     },
//     {
//       id: "fir", 
//       title: "Approve FIRs",
//       desc: "Review pending First Information Reports.",
//       icon: <FaGavel />,
//       color: "from-red-600 to-red-400"
//     },
//     {
//       id: "track", 
//       title: "Live Tracking",
//       desc: "Monitor Patrol Units via GPS.",
//       icon: <FaMapMarkedAlt />,
//       color: "from-yellow-600 to-yellow-400",
//       isRoute: true, 
//       path: "/coming-soon"
//     },
//     {
//       id: "history", 
//       title: "Crime Analytics",
//       desc: "View crime trends and past records.",
//       icon: <FaHistory />,
//       color: "from-purple-600 to-purple-400"
//     },
//     {
//       id: "support",
//       title: "Tech Support",
//       desc: "System Feedback & Help",
//       icon: <FaHeadset />,
//       color: "from-pink-600 to-rose-400"
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
      
//       {/* Header Container */}
//       <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
//         <div className="relative z-10 w-full md:w-3/4 pr-24 md:pr-0">
//           <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
//             Welcome, <span className="text-blue-400 block md:inline">{user.name}</span>
//           </h1>
//           <p className="text-sm md:text-base text-gray-400 mt-1">
//             Designation: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.designation || "Senior Official"}</span>
//           </p>
//         </div>
        
//         <img 
//             src="/Chandrapur_Police.png" 
//             alt="Logo" 
//             className="absolute top-1/2 right-4 -translate-y-1/2 h-35 w-35 opacity-80 md:top-1/2 md:right-10 md:-translate-y-1/2 md:h-[95%] md:w-auto md:max-w-[180px] md:opacity-100 object-contain pointer-events-none drop-shadow-lg transition-all duration-300" 
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
//             `}
//           >
//             <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
//             <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
//               {item.icon}
//             </div>
            
//             <div className="flex-1">
//                 <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">
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

// export default SeniorMenu;






