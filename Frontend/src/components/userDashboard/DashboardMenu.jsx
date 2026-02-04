

import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; 
import { 
  FaUserShield, FaExclamationTriangle, FaSearch, FaFileContract, FaHistory, FaWhatsapp
} from "react-icons/fa";

const DashboardMenu = ({ userName, setActiveTab }) => {
  const navigate = useNavigate(); 

  const menuItems = [
    {
      id: "my_complaints",
      title: "My Reported Crimes", // ✅ First Position
      desc: "View case history and status reports.",
      icon: <FaHistory />,
      color: "from-indigo-600 to-indigo-400",
      isRoute: true,
      path: "/user/history" 
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
      
      {/* Header Container - Senior Dashboard Style */}
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
        {/* Text Section - Added pr-24 for mobile text protection */}
        <div className="relative z-10 w-full md:w-2/3 pr-24 md:pr-0">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Welcome, <span className="text-blue-400 block md:inline">{userName || "Citizen"}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">
            Your safety is our priority. Report incidents securely.
          </p>
        </div>
        
        {/* ✅ LOGO FIXED: EXACTLY LIKE SENIOR MENU */}
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
        {menuItems.map((item) => (
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            key={item.id}
            onClick={() => handleItemClick(item)} 
            className={`
                p-5 md:p-6 rounded-xl cursor-pointer shadow-lg transition-all group relative overflow-hidden flex flex-row md:flex-col items-center md:items-start gap-4 md:gap-0
                bg-gray-800 border border-gray-700 hover:border-blue-500/50 hover:shadow-2xl
                ${item.id === 'emergency' ? 'border-red-500/50 bg-red-900/10 hover:bg-red-900/20' : ''}
            `}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 rounded-bl-full transition-opacity group-hover:opacity-20 hidden md:block`}></div>
            
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br ${item.color} flex shrink-0 items-center justify-center text-xl md:text-2xl text-white mb-0 md:mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            
            <div className="flex-1">
                <h3 className={`text-lg md:text-xl font-bold mb-0.5 md:mb-1 transition-colors ${item.id === 'emergency' ? 'text-red-400' : 'text-white group-hover:text-blue-400'}`}>
                    {item.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm font-medium">
                    {item.desc}
                </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DashboardMenu;