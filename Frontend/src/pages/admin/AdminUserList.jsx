// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import axios from "axios";
// import { FaArrowLeft, FaSearch, FaUserCircle } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const AdminUserList = () => {
//   const { role } = useParams();
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const { data } = await axios.get(`${BASE_URL}/api/users?role=${role}`, config);
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users");
//       }
//     };
//     fetchUsers();
//   }, [role]);

//   const filteredUsers = users.filter(u => 
//     u.firstName.toLowerCase().includes(search.toLowerCase()) || 
//     u.lastName.toLowerCase().includes(search.toLowerCase()) ||
//     u.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Navbar />
//       <div className="max-w-4xl mx-auto pt-28 px-4 pb-20">
//         <button onClick={() => navigate("/admin/data/users")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
//             <FaArrowLeft /> Back
//         </button>

//         <div className="flex justify-between items-center mb-6">
//             <h1 className="text-3xl font-bold capitalize">{role} Database</h1>
//             <div className="relative">
//                 <FaSearch className="absolute left-3 top-3 text-gray-500" />
//                 <input 
//                     className="bg-slate-800 border border-slate-700 rounded-full pl-10 pr-4 py-2 focus:border-blue-500 outline-none w-64" 
//                     placeholder="Search users..." 
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </div>
//         </div>

//         <div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
//             {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user, index) => (
//                     <div 
//                         key={user._id} 
//                         onClick={() => navigate(`/admin/data/users/${role}/${user._id}`)}
//                         className={`p-4 flex items-center gap-4 hover:bg-slate-700/50 cursor-pointer transition-colors ${index !== filteredUsers.length - 1 ? 'border-b border-slate-700' : ''}`}
//                     >
//                         <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-600 bg-slate-900 flex items-center justify-center">
//                             {user.idPhoto ? <img src={user.idPhoto} alt="" className="w-full h-full object-cover" /> : <FaUserCircle className="text-2xl text-slate-500" />}
//                         </div>
//                         <div>
//                             <h3 className="text-lg font-bold text-white">{user.title} {user.firstName} {user.lastName}</h3>
//                             <p className="text-sm text-slate-400">
//                                 {role === 'citizen' ? user.email : `${user.designation} • ${user.station}`}
//                             </p>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="p-8 text-center text-slate-500">No users found.</div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserList;
















// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import axios from "axios";
// import { FaArrowLeft, FaSearch, FaUserCircle, FaUserTie, FaUserShield, FaChevronRight } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const AdminUserList = () => {
//   const { role } = useParams();
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [search, setSearch] = useState("");

//   // ✅ 1. DYNAMIC THEME COLORS (Based on Reference File)
//   const theme = {
//     citizen: {
//         gradient: "hover:from-blue-900/40 hover:to-slate-900/60",
//         border: "hover:border-blue-500/50",
//         shadow: "hover:shadow-blue-500/20",
//         text: "group-hover:text-blue-300",
//         avatarBorder: "group-hover:border-blue-400",
//         icon: <FaUserCircle className="text-2xl text-blue-400" />,
//         badge: "bg-blue-500/10 border-blue-500/30 text-blue-300"
//     },
//     police: {
//         gradient: "hover:from-purple-900/40 hover:to-slate-900/60",
//         border: "hover:border-purple-500/50",
//         shadow: "hover:shadow-purple-500/20",
//         text: "group-hover:text-purple-300",
//         avatarBorder: "group-hover:border-purple-400",
//         icon: <FaUserShield className="text-2xl text-purple-400" />,
//         badge: "bg-purple-500/10 border-purple-500/30 text-purple-300"
//     },
//     senior: {
//         gradient: "hover:from-amber-900/40 hover:to-slate-900/60",
//         border: "hover:border-amber-500/50",
//         shadow: "hover:shadow-amber-500/20",
//         text: "group-hover:text-amber-300",
//         avatarBorder: "group-hover:border-amber-400",
//         icon: <FaUserTie className="text-2xl text-amber-400" />,
//         badge: "bg-amber-500/10 border-amber-500/30 text-amber-300"
//     }
//   };

//   const currentTheme = theme[role] || theme.citizen;

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const { data } = await axios.get(`${BASE_URL}/api/users?role=${role}`, config);
//         setUsers(data);
//       } catch (error) {
//         console.error("Error fetching users");
//       }
//     };
//     fetchUsers();
//   }, [role]);

//   const filteredUsers = users.filter(u => 
//     (u.firstName || "").toLowerCase().includes(search.toLowerCase()) || 
//     (u.lastName || "").toLowerCase().includes(search.toLowerCase()) ||
//     (u.email || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Helper to get safe image URL
//   const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Navbar />
      
//       {/* ✅ Sticky Header Container */}
//       <div className="sticky top-[64px] z-40 bg-gray-900/95 backdrop-blur-xl border-b border-white/5 shadow-2xl pt-6 pb-4 px-4 md:px-8">
//           <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            
//             {/* Back Button & Title */}
//             <div className="flex items-center gap-4 w-full md:w-auto">
//                 <button 
//                     onClick={() => navigate("/admin/data/users")} 
//                     className="bg-white/10 hover:bg-white/20 p-3 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-lg group"
//                 >
//                     <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
//                 </button>
//                 <h1 className="text-xl md:text-3xl font-bold capitalize flex items-center gap-2">
//                     {role} Database <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-gray-300">{filteredUsers.length}</span>
//                 </h1>
//             </div>

//             {/* Search Bar */}
//             <div className="relative w-full md:w-80">
//                 <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
//                 <input 
//                     className="w-full bg-black/40 border border-white/10 text-white text-sm md:text-base p-3 pl-12 rounded-xl outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all placeholder-gray-500 shadow-inner" 
//                     placeholder={`Search ${role}...`}
//                     value={search}
//                     onChange={(e) => setSearch(e.target.value)}
//                 />
//             </div>
//           </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 pb-20 pt-6">
//         <div className="space-y-3">
//             {filteredUsers.length > 0 ? (
//                 filteredUsers.map((user, index) => (
//                     <div 
//                         key={user._id} 
//                         onClick={() => navigate(`/admin/data/users/${role}/${user._id}`)}
//                         style={{ animationDelay: `${index * 0.05}s` }}
//                         className={`group animate-fade-in-up w-full bg-gradient-to-r from-gray-900/80 to-slate-900/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/5 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-between transform hover:-translate-y-1 ${currentTheme.gradient} ${currentTheme.border} ${currentTheme.shadow}`}
//                     >
//                         <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
//                             {/* ✅ Avatar Section (Fixed Size & Shape) */}
//                             <div className="relative shrink-0">
//                                 {user.idPhoto ? (
//                                     <img 
//                                         src={getImageUrl(user.idPhoto)} 
//                                         alt="Profile" 
//                                         className={`w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-slate-500 transition-colors shadow-lg ${currentTheme.avatarBorder}`} 
//                                     />
//                                 ) : (
//                                     <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 border-slate-500 bg-slate-800 shadow-inner ${currentTheme.avatarBorder}`}>
//                                         {currentTheme.icon}
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Details Section */}
//                             <div className="min-w-0">
//                                 <h4 className={`text-base md:text-lg font-bold text-white transition-colors flex items-center gap-2 ${currentTheme.text}`}>
//                                     {user.title} {user.firstName} {user.lastName}
//                                 </h4>
                                
//                                 {/* ✅ Subtext (No Station for Seniors, only Designation) */}
//                                 <div className="flex flex-wrap items-center gap-2 mt-1">
//                                     {role !== 'citizen' && (
//                                         <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border shadow-sm ${currentTheme.badge}`}>
//                                             {user.designation || "Officer"}
//                                         </span>
//                                     )}
//                                     {role === 'citizen' && (
//                                         <span className="text-xs text-gray-400 truncate">{user.email}</span>
//                                     )}
//                                     {/* Only show station for Police, NOT Senior */}
//                                     {role === 'police' && user.station && (
//                                         <span className="text-xs text-gray-500 border-l border-gray-600 pl-2">
//                                             {user.station}
//                                         </span>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Arrow Icon */}
//                         <div className="pr-2 opacity-50 group-hover:opacity-100 transition-opacity">
//                             <FaChevronRight className="text-gray-400 group-hover:text-white" />
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <div className="p-10 text-center text-slate-500 border border-dashed border-slate-700 rounded-2xl bg-white/5">
//                     No users found matching "{search}".
//                 </div>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserList;










import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { FaArrowLeft, FaSearch, FaUserCircle, FaUserTie, FaUserShield, FaChevronRight } from "react-icons/fa";
import { BASE_URL } from "../../config";

const AdminUserList = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // Theme configuration based on Role
  const theme = {
    citizen: {
        gradient: "hover:from-blue-900/40 hover:to-slate-900/60",
        border: "hover:border-blue-500/50",
        shadow: "hover:shadow-blue-500/20",
        text: "group-hover:text-blue-300",
        avatarBorder: "group-hover:border-blue-400",
        icon: <FaUserCircle className="text-2xl text-blue-400" />,
        badge: "bg-blue-500/10 border-blue-500/30 text-blue-300"
    },
    police: {
        gradient: "hover:from-purple-900/40 hover:to-slate-900/60",
        border: "hover:border-purple-500/50",
        shadow: "hover:shadow-purple-500/20",
        text: "group-hover:text-purple-300",
        avatarBorder: "group-hover:border-purple-400",
        icon: <FaUserShield className="text-2xl text-purple-400" />,
        badge: "bg-purple-500/10 border-purple-500/30 text-purple-300"
    },
    senior: {
        gradient: "hover:from-amber-900/40 hover:to-slate-900/60",
        border: "hover:border-amber-500/50",
        shadow: "hover:shadow-amber-500/20",
        text: "group-hover:text-amber-300",
        avatarBorder: "group-hover:border-amber-400",
        icon: <FaUserTie className="text-2xl text-amber-400" />,
        badge: "bg-amber-500/10 border-amber-500/30 text-amber-300"
    }
  };

  const currentTheme = theme[role] || theme.citizen;

  useEffect(() => {
    const fetchUsers = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`${BASE_URL}/api/users?role=${role}`, config);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users");
      }
    };
    fetchUsers();
  }, [role]);

  // Safe Filter Logic
  const filteredUsers = users.filter(u => 
    (u.firstName || "").toLowerCase().includes(search.toLowerCase()) || 
    (u.lastName || "").toLowerCase().includes(search.toLowerCase()) ||
    (u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

  return (
    // ✅ FIX 1: Added 'pt-20' to push content below Fixed Navbar
    <div className="min-h-screen bg-gray-900 text-white font-sans pt-20">
      <Navbar />
      
      {/* ✅ FIX 2: Solid Background (bg-gray-900) instead of Transparent/Blur to fix Overlap */}
      <div className="sticky top-20 z-40 bg-gray-900 border-b border-white/10 shadow-2xl pt-4 pb-4 px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Back Button & Title */}
            <div className="flex items-center gap-4 w-full md:w-auto">
                <button 
                    onClick={() => navigate("/admin/data/users")} 
                    className="bg-white/10 hover:bg-white/20 p-3 rounded-full border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-lg group"
                >
                    <FaArrowLeft className="text-lg group-hover:-translate-x-1 transition-transform" />
                </button>
                <h1 className="text-xl md:text-3xl font-bold capitalize flex items-center gap-2">
                    {role} Database <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-gray-300">{filteredUsers.length}</span>
                </h1>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    className="w-full bg-black/40 border border-white/10 text-white text-sm md:text-base p-3 pl-12 rounded-xl outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all placeholder-gray-500 shadow-inner" 
                    placeholder={`Search ${role}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
          </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-20 pt-6">
        <div className="space-y-3">
            {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                    <div 
                        key={user._id} 
                        onClick={() => navigate(`/admin/data/users/${role}/${user._id}`)}
                        style={{ animationDelay: `${index * 0.05}s` }}
                        className={`group animate-fade-in-up w-full bg-gradient-to-r from-gray-900/80 to-slate-900/80 backdrop-blur-md p-3 md:p-4 rounded-2xl border border-white/5 transition-all duration-300 cursor-pointer shadow-lg flex items-center justify-between transform hover:-translate-y-1 ${currentTheme.gradient} ${currentTheme.border} ${currentTheme.shadow}`}
                    >
                        <div className="flex items-center gap-4 md:gap-5 overflow-hidden">
                            {/* Avatar Section */}
                            <div className="relative shrink-0">
                                {user.idPhoto ? (
                                    <img 
                                        src={getImageUrl(user.idPhoto)} 
                                        alt="Profile" 
                                        // ✅ Better Aspect Ratio
                                        className={`w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-slate-500 transition-colors shadow-lg ${currentTheme.avatarBorder}`} 
                                    />
                                ) : (
                                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 border-slate-500 bg-slate-800 shadow-inner ${currentTheme.avatarBorder}`}>
                                        {currentTheme.icon}
                                    </div>
                                )}
                            </div>

                            {/* Details Section */}
                            <div className="min-w-0">
                                <h4 className={`text-base md:text-lg font-bold text-white transition-colors flex items-center gap-2 ${currentTheme.text}`}>
                                    {user.title} {user.firstName} {user.lastName}
                                </h4>
                                
                                <div className="flex flex-wrap items-center gap-2 mt-1">
                                    {role !== 'citizen' && (
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border shadow-sm ${currentTheme.badge}`}>
                                            {user.designation || "Officer"}
                                        </span>
                                    )}
                                    {role === 'citizen' && (
                                        <span className="text-xs text-gray-400 truncate">{user.email}</span>
                                    )}
                                    
                                    {/* ✅ FIX: Station removed for cleaner look, as requested */}
                                </div>
                            </div>
                        </div>

                        {/* Arrow Icon */}
                        <div className="pr-2 opacity-50 group-hover:opacity-100 transition-opacity">
                            <FaChevronRight className="text-gray-400 group-hover:text-white" />
                        </div>
                    </div>
                ))
            ) : (
                <div className="p-10 text-center text-slate-500 border border-dashed border-slate-700 rounded-2xl bg-white/5">
                    No users found matching "{search}".
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AdminUserList;