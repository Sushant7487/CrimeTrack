
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FaFileAlt, FaGavel, FaHistory, FaVideo, FaUserTag, FaExclamationTriangle, FaWhatsapp, FaUserFriends
} from "react-icons/fa";

const PoliceMenu = ({ user, setActiveTab, hasNewSOS }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "emergency", 
      title: hasNewSOS ? "🚨 SOS ACTIVE!" : "Emergency Alerts",
      desc: hasNewSOS ? "CLICK IMMEDIATELY" : "SOS & Distress Signals",
      icon: <FaExclamationTriangle />,
      color: "from-red-600 to-red-500",
      isEmergencyCard: true,
      priority: true 
    },
    {
      id: "complaints", 
      title: "View Complaints",
      desc: "Manage & Update Status",
      icon: <FaFileAlt />,
      color: "from-blue-600 to-blue-400",
      isRoute: true, 
      path: "/police/complaints"
    },
    {
      id: "fir", 
      title: "File FIR / NCR",
      desc: "Official Record Entry",
      icon: <FaGavel />,
      color: "from-green-600 to-green-400"
    },
    {
      id: "connect", 
      title: "Police Connect",
      desc: "Secure Dept. Chat",
      icon: <FaWhatsapp />,
      color: "from-emerald-600 to-teal-400",
      isRoute: true,
      path: "/police/connect"
    },
    {
      id: "citizen_connect", 
      title: "Citizen Connect",
      desc: "Chat with Public",
      icon: <FaUserFriends />,
      color: "from-cyan-600 to-cyan-400",
      isRoute: true,
      path: "/police/citizen-connect"
    },
    {
      id: "history", 
      title: "Criminal History",
      desc: "Past Records & Convicts",
      icon: <FaHistory />,
      color: "from-purple-600 to-purple-400"
    },
    {
      id: "cctv", 
      title: "Surveillance",
      desc: "CCTV & Suspicious Activity",
      icon: <FaVideo />,
      color: "from-yellow-600 to-yellow-400",
      isRoute: true, 
      path: "/coming-soon"
    },
    {
      id: "face", 
      title: "Face Detection",
      desc: "Identify Suspects",
      icon: <FaUserTag />,
      color: "from-indigo-600 to-indigo-400",
       isRoute: true, 
      path: "/coming-soon"
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
    <div className="space-y-6 md:space-y-8 animate-fade-in-down pb-10">
      
      {/* Responsive Welcome Header */}
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center">
        
        {/* Text Section */}
        <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Welcome, Officer <span className="text-blue-400 block md:inline">{user.name}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">
            Station Jurisdiction: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.station || "Central HQ"}</span>
          </p>
        </div>
        
        {/* ✅ LOGO FIXED: Cleaned up the className syntax error */}
               <img 
            src="/Chandrapur_Police.png" 
            alt="Logo" 
            className="
                absolute 
                
                /* --- MOBILE VIEW --- */
                /* Vertically Centered & Right Aligned */
                top-1/2 right-4 -translate-y-1/2 
                h-35 w-35 
                opacity-80 
                
                /* --- DESKTOP VIEW --- */
                /* Vertically Centered & Scaled to Container Height */
                md:top-1/2 md:right-10 md:-translate-y-1/2 
                md:h-[95%] md:w-auto 
                md:max-w-[200px]
                md:opacity-100 
                
                object-contain pointer-events-none drop-shadow-lg transition-all duration-300
            " 
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {menuItems.map((item) => {
            const isBlinking = item.isEmergencyCard && hasNewSOS;
            return (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                    p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
                    ${isBlinking
                        ? "bg-red-600 border-4 border-yellow-400 animate-pulse shadow-[0_0_50px_rgba(220,38,38,0.9)] z-50 order-first" 
                        : "bg-gray-800 border border-gray-700 hover:shadow-2xl"
                    }
                `}
              >
                {/* Background Decoration */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
                
                {/* Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                
                {/* Text Content */}
                <div className="flex-1">
                    <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${isBlinking ? "text-white uppercase tracking-widest font-black" : "text-white group-hover:text-blue-400"}`}>
                        {item.title}
                    </h3>
                    <p className={`${isBlinking ? "text-yellow-200 font-bold" : "text-gray-400 text-xs md:text-sm"}`}>
                        {item.desc}
                    </p>
                </div>
                
                {/* Emergency Animation Effects */}
                {isBlinking && (
                    <>
                        <span className="absolute top-4 right-4 w-4 h-4 md:w-6 md:h-6 bg-yellow-400 rounded-full animate-ping"></span>
                        <div className="absolute inset-0 border-4 border-red-500 rounded-xl animate-pulse pointer-events-none"></div>
                    </>
                )}
              </motion.div>
            )
        })}
      </div>
    </div>
  );
};

export default PoliceMenu;