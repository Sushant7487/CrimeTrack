// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { 
//   FaChartLine, FaDatabase, FaQuestionCircle, FaFileAlt, FaHome, 
//   FaArrowLeft, FaUsers, FaIdCard, FaGavel, FaBuilding // ✅ Fixed Typo here (FaIdCard)
// } from "react-icons/fa";
// import { motion } from "framer-motion";

// // --- PLACEHOLDER COMPONENTS FOR SUB-SECTIONS ---

// const AdminMenu = ({ onNavigate }) => {
//   const menuItems = [
//     { id: "logs", label: "CrimeTrack Logs", icon: <FaChartLine />, desc: "View system activity & audit logs", color: "blue" },
//     { id: "data", label: "Data Manipulation", icon: <FaDatabase />, desc: "Manage Users, Stations, Sections", color: "purple" },
//     { id: "forms", label: "Forms Management", icon: <FaFileAlt />, desc: "Edit Signup, FIR, NCR forms", color: "green" },
//     { id: "home_content", label: "Home Page", icon: <FaHome />, desc: "Update landing page content", color: "orange" },
//     { id: "help", label: "Help Section", icon: <FaQuestionCircle />, desc: "Manage help documentation", color: "cyan" }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {menuItems.map((item) => (
//         <motion.div 
//           key={item.id}
//           whileHover={{ scale: 1.03 }}
//           onClick={() => onNavigate(item.id)}
//           className={`p-6 rounded-2xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-${item.color}-500 transition-all shadow-lg group`}
//         >
//           <div className={`text-4xl text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`}>{item.icon}</div>
//           <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
//           <p className="text-sm text-slate-400">{item.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const DataManipulationMenu = ({ onNavigate }) => {
//     const items = [
//         { id: "data_users", label: "User Data", icon: <FaUsers /> },
//         { id: "data_designations", label: "Designations", icon: <FaIdCard /> }, // ✅ Fixed Usage here
//         { id: "data_sections", label: "Legal Sections", icon: <FaGavel /> },
//         { id: "data_stations", label: "Police Stations", icon: <FaBuilding /> },
//     ];
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {items.map(item => (
//                 <div key={item.id} onClick={() => onNavigate(item.id)} className="p-5 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 cursor-pointer flex items-center gap-4 transition-all">
//                     <div className="text-2xl text-purple-400">{item.icon}</div>
//                     <span className="text-lg font-bold text-white">{item.label}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const FormsMenu = ({ onNavigate }) => {
//     return (
//         <div className="space-y-4">
//             <h3 className="text-lg font-bold text-green-400 mb-4">Select Form to Manage</h3>
//             <div onClick={() => onNavigate("forms_signup")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 Signup Forms (Citizen / Police / Senior)
//             </div>
//             <div onClick={() => onNavigate("forms_fir")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 FIR Form Structure
//             </div>
//             <div onClick={() => onNavigate("forms_ncr")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 NCR Form Structure
//             </div>
//         </div>
//     );
// };

// // --- MAIN DASHBOARD COMPONENT ---
// const AdminDashboard = ({ defaultTab = "menu" }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   const handleNavigate = (pathKey) => {
//       if (pathKey.startsWith("data_")) {
//           navigate(`/admin/data/${pathKey.replace("data_", "")}`);
//       } else if (pathKey.startsWith("forms_")) {
//           navigate(`/admin/forms/${pathKey.replace("forms_", "")}`);
//       } else {
//           navigate(`/admin/${pathKey}`);
//       }
//   };

//   const goBack = () => {
//       if (activeTab.startsWith("data_")) navigate("/admin/data");
//       else if (activeTab.startsWith("forms_")) navigate("/admin/forms");
//       else navigate("/admin");
//   };

//   const getTitle = () => {
//       switch(activeTab) {
//           case "menu": return "Admin Dashboard";
//           case "logs": return "System Logs";
//           case "data": return "Data Manipulation";
//           case "forms": return "Forms Management";
//           case "help": return "Help Section";
//           case "home_content": return "Home Page Manager";
//           default: return activeTab.replace(/_/g, " ").toUpperCase();
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
//       <Navbar />
      
//       <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-24">
        
//         {/* Header Section */}
//         <div className="flex items-center gap-4 mb-8">
//             {activeTab !== "menu" && (
//                 <button onClick={goBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
//                     <FaArrowLeft />
//                 </button>
//             )}
//             <div>
//                 <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase">
//                     {getTitle()}
//                 </h1>
//                 <p className="text-slate-400 text-sm">System Administration & Control</p>
//             </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
//             {/* 1. Main Menu */}
//             {activeTab === "menu" && <AdminMenu onNavigate={handleNavigate} />}

//             {/* 2. Logs */}
//             {activeTab === "logs" && (
//                 <div className="text-center py-20 text-slate-500">
//                     <FaChartLine className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">System Logs Module</h3>
//                     <p>Coming Soon: Activity tracking & audit trails.</p>
//                 </div>
//             )}

//             {/* 3. Data Manipulation Menu */}
//             {activeTab === "data" && <DataManipulationMenu onNavigate={handleNavigate} />}
            
//             {/* 3a. Specific Data Pages (Placeholders) */}
//             {(activeTab.startsWith("data_")) && (
//                 <div className="text-center py-20 text-purple-400">
//                     <FaDatabase className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Managing: {activeTab.replace("data_", "").toUpperCase()}</h3>
//                     <p className="text-slate-400">Table view and edit functionality will be implemented here.</p>
//                 </div>
//             )}

//             {/* 4. Forms Menu */}
//             {activeTab === "forms" && <FormsMenu onNavigate={handleNavigate} />}

//             {/* 4a. Specific Form Pages */}
//             {(activeTab.startsWith("forms_")) && (
//                 <div className="text-center py-20 text-green-400">
//                     <FaFileAlt className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Editing: {activeTab.replace("forms_", "").toUpperCase()} Form</h3>
//                     <p className="text-slate-400">Form builder interface coming soon.</p>
//                 </div>
//             )}

//             {/* 5. Help */}
//             {activeTab === "help" && (
//                 <div className="text-center py-20 text-cyan-400">
//                     <FaQuestionCircle className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Help Center Manager</h3>
//                     <p className="text-slate-400">Add/Edit FAQs and Support contacts.</p>
//                 </div>
//             )}

//             {/* 6. Home Content */}
//             {activeTab === "home_content" && (
//                 <div className="text-center py-20 text-orange-400">
//                     <FaHome className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Landing Page Manager</h3>
//                     <p className="text-slate-400">Edit hero text, banners, and announcements.</p>
//                 </div>
//             )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { 
//   FaChartLine, FaDatabase, FaQuestionCircle, FaFileAlt, FaHome, 
//   FaArrowLeft, FaUsers, FaIdCard, FaGavel, FaBuilding 
// } from "react-icons/fa";
// import { motion } from "framer-motion";

// // ✅ IMPORT THE NEW LOGS COMPONENT
// import AdminLogs from "./admin/AdminLogs";

// // --- PLACEHOLDER COMPONENTS FOR SUB-SECTIONS ---

// const AdminMenu = ({ onNavigate }) => {
//   const menuItems = [
//     { id: "logs", label: "CrimeTrack Logs", icon: <FaChartLine />, desc: "View system activity & audit logs", color: "blue" },
//     { id: "data", label: "Data Manipulation", icon: <FaDatabase />, desc: "Manage Users, Stations, Sections", color: "purple" },
//     { id: "forms", label: "Forms Management", icon: <FaFileAlt />, desc: "Edit Signup, FIR, NCR forms", color: "green" },
//     { id: "home_content", label: "Home Page", icon: <FaHome />, desc: "Update landing page content", color: "orange" },
//     { id: "help", label: "Help Section", icon: <FaQuestionCircle />, desc: "Manage help documentation", color: "cyan" }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {menuItems.map((item) => (
//         <motion.div 
//           key={item.id}
//           whileHover={{ scale: 1.03 }}
//           onClick={() => onNavigate(item.id)}
//           className={`p-6 rounded-2xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-${item.color}-500 transition-all shadow-lg group`}
//         >
//           <div className={`text-4xl text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`}>{item.icon}</div>
//           <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
//           <p className="text-sm text-slate-400">{item.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const DataManipulationMenu = ({ onNavigate }) => {
//     const items = [
//         { id: "data_users", label: "User Data", icon: <FaUsers /> },
//         { id: "data_designations", label: "Designations", icon: <FaIdCard /> }, 
//         { id: "data_sections", label: "Legal Sections", icon: <FaGavel /> },
//         { id: "data_stations", label: "Police Stations", icon: <FaBuilding /> },
//     ];
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {items.map(item => (
//                 <div key={item.id} onClick={() => onNavigate(item.id)} className="p-5 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 cursor-pointer flex items-center gap-4 transition-all">
//                     <div className="text-2xl text-purple-400">{item.icon}</div>
//                     <span className="text-lg font-bold text-white">{item.label}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const FormsMenu = ({ onNavigate }) => {
//     return (
//         <div className="space-y-4">
//             <h3 className="text-lg font-bold text-green-400 mb-4">Select Form to Manage</h3>
//             <div onClick={() => onNavigate("forms_signup")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 Signup Forms (Citizen / Police / Senior)
//             </div>
//             <div onClick={() => onNavigate("forms_fir")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 FIR Form Structure
//             </div>
//             <div onClick={() => onNavigate("forms_ncr")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 NCR Form Structure
//             </div>
//         </div>
//     );
// };

// // --- MAIN DASHBOARD COMPONENT ---
// const AdminDashboard = ({ defaultTab = "menu" }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   const handleNavigate = (pathKey) => {
//       if (pathKey.startsWith("data_")) {
//           navigate(`/admin/data/${pathKey.replace("data_", "")}`);
//       } else if (pathKey.startsWith("forms_")) {
//           navigate(`/admin/forms/${pathKey.replace("forms_", "")}`);
//       } else {
//           navigate(`/admin/${pathKey}`);
//       }
//   };

//   const goBack = () => {
//       if (activeTab.startsWith("data_")) navigate("/admin/data");
//       else if (activeTab.startsWith("forms_")) navigate("/admin/forms");
//       else navigate("/admin");
//   };

//   const getTitle = () => {
//       switch(activeTab) {
//           case "menu": return "Admin Dashboard";
//           case "logs": return "System Logs";
//           case "data": return "Data Manipulation";
//           case "forms": return "Forms Management";
//           case "help": return "Help Section";
//           case "home_content": return "Home Page Manager";
//           default: return activeTab.replace(/_/g, " ").toUpperCase();
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
//       <Navbar />
      
//       <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-24">
        
//         {/* Header Section */}
//         <div className="flex items-center gap-4 mb-8">
//             {activeTab !== "menu" && (
//                 <button onClick={goBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
//                     <FaArrowLeft />
//                 </button>
//             )}
//             <div>
//                 <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase">
//                     {getTitle()}
//                 </h1>
//                 <p className="text-slate-400 text-sm">System Administration & Control</p>
//             </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
//             {/* 1. Main Menu */}
//             {activeTab === "menu" && <AdminMenu onNavigate={handleNavigate} />}

//             {/* 2. Logs - ✅ UPDATED: Now renders the full AdminLogs Component */}
//             {activeTab === "logs" && (
//                 <AdminLogs />
//             )}

//             {/* 3. Data Manipulation Menu */}
//             {activeTab === "data" && <DataManipulationMenu onNavigate={handleNavigate} />}
            
//             {/* 3a. Specific Data Pages (Placeholders) */}
//             {(activeTab.startsWith("data_")) && (
//                 <div className="text-center py-20 text-purple-400">
//                     <FaDatabase className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Managing: {activeTab.replace("data_", "").toUpperCase()}</h3>
//                     <p className="text-slate-400">Table view and edit functionality will be implemented here.</p>
//                 </div>
//             )}

//             {/* 4. Forms Menu */}
//             {activeTab === "forms" && <FormsMenu onNavigate={handleNavigate} />}

//             {/* 4a. Specific Form Pages */}
//             {(activeTab.startsWith("forms_")) && (
//                 <div className="text-center py-20 text-green-400">
//                     <FaFileAlt className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Editing: {activeTab.replace("forms_", "").toUpperCase()} Form</h3>
//                     <p className="text-slate-400">Form builder interface coming soon.</p>
//                 </div>
//             )}

//             {/* 5. Help */}
//             {activeTab === "help" && (
//                 <div className="text-center py-20 text-cyan-400">
//                     <FaQuestionCircle className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Help Center Manager</h3>
//                     <p className="text-slate-400">Add/Edit FAQs and Support contacts.</p>
//                 </div>
//             )}

//             {/* 6. Home Content */}
//             {activeTab === "home_content" && (
//                 <div className="text-center py-20 text-orange-400">
//                     <FaHome className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Landing Page Manager</h3>
//                     <p className="text-slate-400">Edit hero text, banners, and announcements.</p>
//                 </div>
//             )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;













// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { 
//   FaChartLine, FaDatabase, FaQuestionCircle, FaFileAlt, FaHome, 
//   FaArrowLeft, FaUsers, FaIdCard, FaGavel, FaBuilding // ✅ Fixed Typo here (FaIdCard)
// } from "react-icons/fa";
// import { motion } from "framer-motion";

// // --- PLACEHOLDER COMPONENTS FOR SUB-SECTIONS ---

// const AdminMenu = ({ onNavigate }) => {
//   const menuItems = [
//     { id: "logs", label: "CrimeTrack Logs", icon: <FaChartLine />, desc: "View system activity & audit logs", color: "blue" },
//     { id: "data", label: "Data Manipulation", icon: <FaDatabase />, desc: "Manage Users, Stations, Sections", color: "purple" },
//     { id: "forms", label: "Forms Management", icon: <FaFileAlt />, desc: "Edit Signup, FIR, NCR forms", color: "green" },
//     { id: "home_content", label: "Home Page", icon: <FaHome />, desc: "Update landing page content", color: "orange" },
//     { id: "help", label: "Help Section", icon: <FaQuestionCircle />, desc: "Manage help documentation", color: "cyan" }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {menuItems.map((item) => (
//         <motion.div 
//           key={item.id}
//           whileHover={{ scale: 1.03 }}
//           onClick={() => onNavigate(item.id)}
//           className={`p-6 rounded-2xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-${item.color}-500 transition-all shadow-lg group`}
//         >
//           <div className={`text-4xl text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`}>{item.icon}</div>
//           <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
//           <p className="text-sm text-slate-400">{item.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const DataManipulationMenu = ({ onNavigate }) => {
//     const items = [
//         { id: "data_users", label: "User Data", icon: <FaUsers /> },
//         { id: "data_designations", label: "Designations", icon: <FaIdCard /> }, // ✅ Fixed Usage here
//         { id: "data_sections", label: "Legal Sections", icon: <FaGavel /> },
//         { id: "data_stations", label: "Police Stations", icon: <FaBuilding /> },
//     ];
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {items.map(item => (
//                 <div key={item.id} onClick={() => onNavigate(item.id)} className="p-5 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 cursor-pointer flex items-center gap-4 transition-all">
//                     <div className="text-2xl text-purple-400">{item.icon}</div>
//                     <span className="text-lg font-bold text-white">{item.label}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const FormsMenu = ({ onNavigate }) => {
//     return (
//         <div className="space-y-4">
//             <h3 className="text-lg font-bold text-green-400 mb-4">Select Form to Manage</h3>
//             <div onClick={() => onNavigate("forms_signup")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 Signup Forms (Citizen / Police / Senior)
//             </div>
//             <div onClick={() => onNavigate("forms_fir")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 FIR Form Structure
//             </div>
//             <div onClick={() => onNavigate("forms_ncr")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 NCR Form Structure
//             </div>
//         </div>
//     );
// };

// // --- MAIN DASHBOARD COMPONENT ---
// const AdminDashboard = ({ defaultTab = "menu" }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   const handleNavigate = (pathKey) => {
//       if (pathKey.startsWith("data_")) {
//           navigate(`/admin/data/${pathKey.replace("data_", "")}`);
//       } else if (pathKey.startsWith("forms_")) {
//           navigate(`/admin/forms/${pathKey.replace("forms_", "")}`);
//       } else {
//           navigate(`/admin/${pathKey}`);
//       }
//   };

//   const goBack = () => {
//       if (activeTab.startsWith("data_")) navigate("/admin/data");
//       else if (activeTab.startsWith("forms_")) navigate("/admin/forms");
//       else navigate("/admin");
//   };

//   const getTitle = () => {
//       switch(activeTab) {
//           case "menu": return "Admin Dashboard";
//           case "logs": return "System Logs";
//           case "data": return "Data Manipulation";
//           case "forms": return "Forms Management";
//           case "help": return "Help Section";
//           case "home_content": return "Home Page Manager";
//           default: return activeTab.replace(/_/g, " ").toUpperCase();
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
//       <Navbar />
      
//       <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-24">
        
//         {/* Header Section */}
//         <div className="flex items-center gap-4 mb-8">
//             {activeTab !== "menu" && (
//                 <button onClick={goBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
//                     <FaArrowLeft />
//                 </button>
//             )}
//             <div>
//                 <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase">
//                     {getTitle()}
//                 </h1>
//                 <p className="text-slate-400 text-sm">System Administration & Control</p>
//             </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
//             {/* 1. Main Menu */}
//             {activeTab === "menu" && <AdminMenu onNavigate={handleNavigate} />}

//             {/* 2. Logs */}
//             {activeTab === "logs" && (
//                 <div className="text-center py-20 text-slate-500">
//                     <FaChartLine className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">System Logs Module</h3>
//                     <p>Coming Soon: Activity tracking & audit trails.</p>
//                 </div>
//             )}

//             {/* 3. Data Manipulation Menu */}
//             {activeTab === "data" && <DataManipulationMenu onNavigate={handleNavigate} />}
            
//             {/* 3a. Specific Data Pages (Placeholders) */}
//             {(activeTab.startsWith("data_")) && (
//                 <div className="text-center py-20 text-purple-400">
//                     <FaDatabase className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Managing: {activeTab.replace("data_", "").toUpperCase()}</h3>
//                     <p className="text-slate-400">Table view and edit functionality will be implemented here.</p>
//                 </div>
//             )}

//             {/* 4. Forms Menu */}
//             {activeTab === "forms" && <FormsMenu onNavigate={handleNavigate} />}

//             {/* 4a. Specific Form Pages */}
//             {(activeTab.startsWith("forms_")) && (
//                 <div className="text-center py-20 text-green-400">
//                     <FaFileAlt className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Editing: {activeTab.replace("forms_", "").toUpperCase()} Form</h3>
//                     <p className="text-slate-400">Form builder interface coming soon.</p>
//                 </div>
//             )}

//             {/* 5. Help */}
//             {activeTab === "help" && (
//                 <div className="text-center py-20 text-cyan-400">
//                     <FaQuestionCircle className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Help Center Manager</h3>
//                     <p className="text-slate-400">Add/Edit FAQs and Support contacts.</p>
//                 </div>
//             )}

//             {/* 6. Home Content */}
//             {activeTab === "home_content" && (
//                 <div className="text-center py-20 text-orange-400">
//                     <FaHome className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Landing Page Manager</h3>
//                     <p className="text-slate-400">Edit hero text, banners, and announcements.</p>
//                 </div>
//             )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;







// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { 
//   FaChartLine, FaDatabase, FaQuestionCircle, FaFileAlt, FaHome, 
//   FaArrowLeft, FaUsers, FaIdCard, FaGavel, FaBuilding 
// } from "react-icons/fa";
// import { motion } from "framer-motion";

// // ✅ IMPORT THE NEW LOGS COMPONENT
// import AdminLogs from "./admin/AdminLogs";
// // ✅ IMPORT THE NEW HELP PANEL
// import AdminHelpPanel from "./admin/AdminHelpPanel";

// // --- PLACEHOLDER COMPONENTS FOR SUB-SECTIONS ---

// const AdminMenu = ({ onNavigate }) => {
//   const menuItems = [
//     { id: "logs", label: "CrimeTrack Logs", icon: <FaChartLine />, desc: "View system activity & audit logs", color: "blue" },
//     { id: "data", label: "Data Manipulation", icon: <FaDatabase />, desc: "Manage Users, Stations, Sections", color: "purple" },
//     { id: "forms", label: "Forms Management", icon: <FaFileAlt />, desc: "Edit Signup, FIR, NCR forms", color: "green" },
//     { id: "home_content", label: "Home Page", icon: <FaHome />, desc: "Update landing page content", color: "orange" },
//     // ✅ Updated Label
//     { id: "help", label: "Help & Reviews", icon: <FaQuestionCircle />, desc: "Manage tickets & feedback", color: "cyan" }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {menuItems.map((item) => (
//         <motion.div 
//           key={item.id}
//           whileHover={{ scale: 1.03 }}
//           onClick={() => onNavigate(item.id)}
//           className={`p-6 rounded-2xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-${item.color}-500 transition-all shadow-lg group`}
//         >
//           <div className={`text-4xl text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`}>{item.icon}</div>
//           <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
//           <p className="text-sm text-slate-400">{item.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const DataManipulationMenu = ({ onNavigate }) => {
//     const items = [
//         { id: "data_users", label: "User Data", icon: <FaUsers /> },
//         { id: "data_designations", label: "Designations", icon: <FaIdCard /> }, 
//         { id: "data_sections", label: "Legal Sections", icon: <FaGavel /> },
//         { id: "data_stations", label: "Police Stations", icon: <FaBuilding /> },
//     ];
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {items.map(item => (
//                 <div key={item.id} onClick={() => onNavigate(item.id)} className="p-5 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 cursor-pointer flex items-center gap-4 transition-all">
//                     <div className="text-2xl text-purple-400">{item.icon}</div>
//                     <span className="text-lg font-bold text-white">{item.label}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const FormsMenu = ({ onNavigate }) => {
//     return (
//         <div className="space-y-4">
//             <h3 className="text-lg font-bold text-green-400 mb-4">Select Form to Manage</h3>
//             <div onClick={() => onNavigate("forms_signup")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 Signup Forms (Citizen / Police / Senior)
//             </div>
//             <div onClick={() => onNavigate("forms_fir")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 FIR Form Structure
//             </div>
//             <div onClick={() => onNavigate("forms_ncr")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 NCR Form Structure
//             </div>
//         </div>
//     );
// };

// // --- MAIN DASHBOARD COMPONENT ---
// const AdminDashboard = ({ defaultTab = "menu" }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   const handleNavigate = (pathKey) => {
//       if (pathKey.startsWith("data_")) {
//           navigate(`/admin/data/${pathKey.replace("data_", "")}`);
//       } else if (pathKey.startsWith("forms_")) {
//           navigate(`/admin/forms/${pathKey.replace("forms_", "")}`);
//       } else {
//           navigate(`/admin/${pathKey}`);
//       }
//   };

//   const goBack = () => {
//       if (activeTab.startsWith("data_")) navigate("/admin/data");
//       else if (activeTab.startsWith("forms_")) navigate("/admin/forms");
//       else navigate("/admin");
//   };

//   const getTitle = () => {
//       switch(activeTab) {
//           case "menu": return "Admin Dashboard";
//           case "logs": return "System Logs";
//           case "data": return "Data Manipulation";
//           case "forms": return "Forms Management";
//           case "help": return "Help & Support Center";
//           case "home_content": return "Home Page Manager";
//           default: return activeTab.replace(/_/g, " ").toUpperCase();
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
//       <Navbar />
      
//       <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-24">
        
//         {/* Header Section */}
//         <div className="flex items-center gap-4 mb-8">
//             {activeTab !== "menu" && (
//                 <button onClick={goBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
//                     <FaArrowLeft />
//                 </button>
//             )}
//             <div>
//                 <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase">
//                     {getTitle()}
//                 </h1>
//                 <p className="text-slate-400 text-sm">System Administration & Control</p>
//             </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
//             {/* 1. Main Menu */}
//             {activeTab === "menu" && <AdminMenu onNavigate={handleNavigate} />}

//             {/* 2. Logs */}
//             {activeTab === "logs" && <AdminLogs />}

//             {/* 3. Data Manipulation Menu */}
//             {activeTab === "data" && <DataManipulationMenu onNavigate={handleNavigate} />}
            
//             {/* 3a. Specific Data Pages (Placeholders) */}
//             {(activeTab.startsWith("data_")) && (
//                 <div className="text-center py-20 text-purple-400">
//                     <FaDatabase className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Managing: {activeTab.replace("data_", "").toUpperCase()}</h3>
//                     <p className="text-slate-400">Table view and edit functionality will be implemented here.</p>
//                 </div>
//             )}

//             {/* 4. Forms Menu */}
//             {activeTab === "forms" && <FormsMenu onNavigate={handleNavigate} />}

//             {/* 4a. Specific Form Pages */}
//             {(activeTab.startsWith("forms_")) && (
//                 <div className="text-center py-20 text-green-400">
//                     <FaFileAlt className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Editing: {activeTab.replace("forms_", "").toUpperCase()} Form</h3>
//                     <p className="text-slate-400">Form builder interface coming soon.</p>
//                 </div>
//             )}

//             {/* 5. Help Section - ✅ REPLACED WITH ACTUAL PANEL */}
//             {activeTab === "help" && <AdminHelpPanel />}

//             {/* 6. Home Content */}
//             {activeTab === "home_content" && (
//                 <div className="text-center py-20 text-orange-400">
//                     <FaHome className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Landing Page Manager</h3>
//                     <p className="text-slate-400">Edit hero text, banners, and announcements.</p>
//                 </div>
//             )}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { 
//   FaChartLine, FaDatabase, FaQuestionCircle, FaFileAlt, FaHome, 
//   FaArrowLeft, FaUsers, FaIdCard, FaGavel, FaBuilding 
// } from "react-icons/fa";
// import { motion } from "framer-motion";

// // ✅ IMPORT NEW COMPONENTS
// import AdminLogs from "./admin/AdminLogs";
// import AdminHelpPanel from "./admin/AdminHelpPanel";
// import AdminHomeContent from "./admin/AdminHomeContent"; // ✅ New Component

// // --- SUB-MENUS ---
// const AdminMenu = ({ onNavigate }) => {
//   const menuItems = [
//     { id: "logs", label: "CrimeTrack Logs", icon: <FaChartLine />, desc: "View system activity & audit logs", color: "blue" },
//     { id: "data", label: "Data Manipulation", icon: <FaDatabase />, desc: "Manage Users, Stations, Sections", color: "purple" },
//     { id: "forms", label: "Forms Management", icon: <FaFileAlt />, desc: "Edit Signup, FIR, NCR forms", color: "green" },
//     { id: "home_content", label: "Home Page", icon: <FaHome />, desc: "Update Marquee, FAQs & Reviews", color: "orange" }, // ✅ Updated Desc
//     { id: "help", label: "Help & Reviews", icon: <FaQuestionCircle />, desc: "Manage tickets & feedback", color: "cyan" }
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {menuItems.map((item) => (
//         <motion.div 
//           key={item.id}
//           whileHover={{ scale: 1.03 }}
//           onClick={() => onNavigate(item.id)}
//           className={`p-6 rounded-2xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-${item.color}-500 transition-all shadow-lg group`}
//         >
//           <div className={`text-4xl text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`}>{item.icon}</div>
//           <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
//           <p className="text-sm text-slate-400">{item.desc}</p>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// const DataManipulationMenu = ({ onNavigate }) => {
//     const items = [
//         { id: "data_users", label: "User Data", icon: <FaUsers /> },
//         { id: "data_designations", label: "Designations", icon: <FaIdCard /> }, 
//         { id: "data_sections", label: "Legal Sections", icon: <FaGavel /> },
//         { id: "data_stations", label: "Police Stations", icon: <FaBuilding /> },
//     ];
//     return (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {items.map(item => (
//                 <div key={item.id} onClick={() => onNavigate(item.id)} className="p-5 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 cursor-pointer flex items-center gap-4 transition-all">
//                     <div className="text-2xl text-purple-400">{item.icon}</div>
//                     <span className="text-lg font-bold text-white">{item.label}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };

// const FormsMenu = ({ onNavigate }) => {
//     return (
//         <div className="space-y-4">
//             <h3 className="text-lg font-bold text-green-400 mb-4">Select Form to Manage</h3>
//             <div onClick={() => onNavigate("forms_signup")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 Signup Forms (Citizen / Police / Senior)
//             </div>
//             <div onClick={() => onNavigate("forms_fir")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 FIR Form Structure
//             </div>
//             <div onClick={() => onNavigate("forms_ncr")} className="p-4 bg-slate-800 border border-slate-700 rounded-lg hover:border-green-500 cursor-pointer">
//                 NCR Form Structure
//             </div>
//         </div>
//     );
// };

// // --- MAIN COMPONENT ---
// const AdminDashboard = ({ defaultTab = "menu" }) => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(defaultTab);

//   useEffect(() => {
//     setActiveTab(defaultTab);
//   }, [defaultTab]);

//   const handleNavigate = (pathKey) => {
//       if (pathKey.startsWith("data_")) {
//           navigate(`/admin/data/${pathKey.replace("data_", "")}`);
//       } else if (pathKey.startsWith("forms_")) {
//           navigate(`/admin/forms/${pathKey.replace("forms_", "")}`);
//       } else {
//           navigate(`/admin/${pathKey}`);
//       }
//   };

//   const goBack = () => {
//       if (activeTab.startsWith("data_")) navigate("/admin/data");
//       else if (activeTab.startsWith("forms_")) navigate("/admin/forms");
//       else navigate("/admin");
//   };

//   const getTitle = () => {
//       switch(activeTab) {
//           case "menu": return "Admin Dashboard";
//           case "logs": return "System Logs";
//           case "data": return "Data Manipulation";
//           case "forms": return "Forms Management";
//           case "help": return "Help & Support Center";
//           case "home_content": return "Home Page Manager";
//           default: return activeTab.replace(/_/g, " ").toUpperCase();
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
//       <Navbar />
      
//       <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-24">
        
//         {/* Header Section */}
//         <div className="flex items-center gap-4 mb-8">
//             {activeTab !== "menu" && (
//                 <button onClick={goBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
//                     <FaArrowLeft />
//                 </button>
//             )}
//             <div>
//                 <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase">
//                     {getTitle()}
//                 </h1>
//                 <p className="text-slate-400 text-sm">System Administration & Control</p>
//             </div>
//         </div>

//         {/* Content Area */}
//         <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
//             {activeTab === "menu" && <AdminMenu onNavigate={handleNavigate} />}
//             {activeTab === "logs" && <AdminLogs />}
//             {activeTab === "data" && <DataManipulationMenu onNavigate={handleNavigate} />}
            
//             {(activeTab.startsWith("data_")) && (
//                 <div className="text-center py-20 text-purple-400">
//                     <FaDatabase className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Managing: {activeTab.replace("data_", "").toUpperCase()}</h3>
//                     <p className="text-slate-400">Table view and edit functionality will be implemented here.</p>
//                 </div>
//             )}

//             {activeTab === "forms" && <FormsMenu onNavigate={handleNavigate} />}

//             {(activeTab.startsWith("forms_")) && (
//                 <div className="text-center py-20 text-green-400">
//                     <FaFileAlt className="text-5xl mx-auto mb-4 opacity-50"/>
//                     <h3 className="text-xl font-bold">Editing: {activeTab.replace("forms_", "").toUpperCase()} Form</h3>
//                     <p className="text-slate-400">Form builder interface coming soon.</p>
//                 </div>
//             )}

//             {activeTab === "help" && <AdminHelpPanel />}

//             {/* ✅ 6. Home Content - REPLACED WITH ACTUAL PANEL */}
//             {activeTab === "home_content" && <AdminHomeContent />}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;













import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { 
  FaDatabase, FaQuestionCircle, FaHome, 
  FaArrowLeft, FaUsers, FaIdCard, FaGavel, FaBuilding 
} from "react-icons/fa";
import { motion } from "framer-motion";

// ✅ IMPORT COMPONENTS (Removed Logs Import)
import AdminHelpPanel from "./admin/AdminHelpPanel";
import AdminHomeContent from "./admin/AdminHomeContent"; 

// --- SUB-MENUS ---
const AdminMenu = ({ onNavigate }) => {
  // ✅ Removed "logs" and "forms" from menuItems
  const menuItems = [
    { id: "data", label: "Data Manipulation", icon: <FaDatabase />, desc: "Manage Users, Stations, Sections", color: "purple" },
    { id: "home_content", label: "Home Page", icon: <FaHome />, desc: "Update Marquee, FAQs & Reviews", color: "orange" },
    { id: "help", label: "Help & Reviews", icon: <FaQuestionCircle />, desc: "Manage tickets & feedback", color: "cyan" }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((item) => (
        <motion.div 
          key={item.id}
          whileHover={{ scale: 1.03 }}
          onClick={() => onNavigate(item.id)}
          className={`p-6 rounded-2xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:border-${item.color}-500 transition-all shadow-lg group`}
        >
          <div className={`text-4xl text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`}>{item.icon}</div>
          <h3 className="text-xl font-bold text-white mb-2">{item.label}</h3>
          <p className="text-sm text-slate-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

const DataManipulationMenu = ({ onNavigate }) => {
    const items = [
        { id: "data_users", label: "User Data", icon: <FaUsers /> },
        { id: "data_designations", label: "Designations", icon: <FaIdCard /> }, 
        { id: "data_sections", label: "Legal Sections", icon: <FaGavel /> },
        { id: "data_stations", label: "Police Stations", icon: <FaBuilding /> },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map(item => (
                <div key={item.id} onClick={() => onNavigate(item.id)} className="p-5 bg-slate-800 border border-slate-700 rounded-xl hover:border-purple-500 cursor-pointer flex items-center gap-4 transition-all">
                    <div className="text-2xl text-purple-400">{item.icon}</div>
                    <span className="text-lg font-bold text-white">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

// --- MAIN COMPONENT ---
const AdminDashboard = ({ defaultTab = "menu" }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab]);

  const handleNavigate = (pathKey) => {
      if (pathKey.startsWith("data_")) {
          navigate(`/admin/data/${pathKey.replace("data_", "")}`);
      } else {
          navigate(`/admin/${pathKey}`);
      }
  };

  const goBack = () => {
      if (activeTab.startsWith("data_")) navigate("/admin/data");
      else navigate("/admin");
  };

  const getTitle = () => {
      switch(activeTab) {
          case "menu": return "Admin Dashboard";
          case "data": return "Data Manipulation";
          case "help": return "Help & Support Center";
          case "home_content": return "Home Page Manager";
          default: return activeTab.replace(/_/g, " ").toUpperCase();
      }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans flex flex-col">
      <Navbar />
      
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 md:px-8 py-24">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-8">
            {activeTab !== "menu" && (
                <button onClick={goBack} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
                    <FaArrowLeft />
                </button>
            )}
            <div>
                <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 uppercase">
                    {getTitle()}
                </h1>
                <p className="text-slate-400 text-sm">System Administration & Control</p>
            </div>
        </div>

        {/* Content Area */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl min-h-[500px]">
            
            {/* 1. Main Menu */}
            {activeTab === "menu" && <AdminMenu onNavigate={handleNavigate} />}

            {/* 2. Data Manipulation Menu */}
            {activeTab === "data" && <DataManipulationMenu onNavigate={handleNavigate} />}
            
            {/* 2a. Specific Data Pages (Placeholders for routing logic) */}
            {(activeTab.startsWith("data_")) && (
                <div className="text-center py-20 text-purple-400">
                    <FaDatabase className="text-5xl mx-auto mb-4 opacity-50"/>
                    <h3 className="text-xl font-bold">Managing: {activeTab.replace("data_", "").toUpperCase()}</h3>
                    <p className="text-slate-400">Table view and edit functionality will be implemented here.</p>
                </div>
            )}

            {/* 3. Help Section */}
            {activeTab === "help" && <AdminHelpPanel />}

            {/* 4. Home Content Manager */}
            {activeTab === "home_content" && <AdminHomeContent />}

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;