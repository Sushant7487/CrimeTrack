
import React from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { 
  FaTasks, FaUsersCog, FaGavel, FaMapMarkedAlt, FaHistory, FaWhatsapp, FaUserFriends
} from "react-icons/fa";

const SeniorMenu = ({ user, setActiveTab }) => {
  const navigate = useNavigate(); 

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
      
      {/* Header Container */}
      {/* Added min-h-[130px] to ensure desktop logo always has space */}
      <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl overflow-hidden flex flex-col md:flex-row items-start md:items-center min-h-[130px]">
        
        {/* Text Section */}
        {/* pr-24 ensures text wraps before hitting the logo on mobile */}
        <div className="relative z-10 w-full md:w-3/4 pr-24 md:pr-0">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 leading-tight">
            Welcome, <span className="text-blue-400 block md:inline">{user.name}</span>
          </h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">
            Designation: <span className="text-white font-mono bg-gray-800 px-2 py-0.5 rounded">{user.designation || "Senior Official"}</span>
          </p>
        </div>
        
        {/* ✅ LOGO FIXED */}
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
                md:h-[95%] md:w-auto  /* ✅ This fixes the overflow issue! */
                md:max-w-[180px]
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
                <h3 className="text-lg md:text-xl font-bold text-white mb-0.5 md:mb-1 group-hover:text-blue-400 transition-colors">
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

export default SeniorMenu;