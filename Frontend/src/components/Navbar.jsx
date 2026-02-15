
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars } from "react-icons/fa"; 

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
//   const toastId = `nav-toast-${Date.now()}`;
  
//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3500, position: 'top-center', id: toastId }); 
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled);

//   return (
//     <>
//     <Toaster containerStyle={{ top: 20, zIndex: 999999 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/60 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      
//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20">
        
//         {/* LOGO AREA */}
//         <Link to="/" className="flex items-center gap-3 group relative z-50">
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
//                   <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                 </div>
//                 <div className="relative">
//                     {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                 </div>
//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE (Visible on Mobile) --- */}
//         <div className="flex items-center gap-2 md:hidden">
//             {/* User Avatar Tiny (Visible outside menu) */}
//             {user && (
//                 <Link to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} className="relative">
//                     <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                 </Link>
//             )}
            
//             {/* Hamburger Button */}
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className="text-white p-2 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-transform"
//             >
//                 <FaBars size={20} />
//             </button>
//         </div>
//       </div>

//       {/* --- MOBILE SIDE DRAWER (Sliding Menu) --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             {/* 1. Backdrop (Click to close) */}
//             <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setMenuOpen(false)}
//                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
//             />

//             {/* 2. Side Drawer */}
//             <motion.div 
//                 initial={{ x: "100%" }} 
//                 animate={{ x: 0 }} 
//                 exit={{ x: "100%" }} 
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                 className="fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-[#0F172A] border-l border-gray-800 shadow-2xl z-[70] md:hidden flex flex-col"
//             >
                
//                 {/* Drawer Header */}
//                 <div className="flex items-center justify-between p-5 border-b border-gray-800/50">
//                     <h2 className="text-lg font-bold text-white tracking-wide">Menu</h2>
//                     <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white p-1">
//                         <FaTimes size={20} />
//                     </button>
//                 </div>

//                 {/* Drawer Content */}
//                 <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    
//                     {/* User Info (Inside Menu) */}
//                     {user && (
//                         <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-3 border border-gray-700">
//                              <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-10 h-10 rounded-full object-cover" />
//                              <div>
//                                 <p className="text-sm font-bold text-white">{user.name}</p>
//                                 <p className="text-xs text-cyan-400 uppercase">{user.role}</p>
//                              </div>
//                         </div>
//                     )}

//                     {/* Navigation Links */}
//                     <div className="flex flex-col space-y-2">
//                         <MobileLink to="/" onClick={() => setMenuOpen(false)}>Home</MobileLink>
//                         <MobileLink to="/legalaid" onClick={() => setMenuOpen(false)}>Legal Aid</MobileLink>
//                         {user && (
//                             <MobileLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} onClick={() => setMenuOpen(false)}>
//                                 <span className="text-cyan-400">My Dashboard</span>
//                             </MobileLink>
//                         )}
//                     </div>

//                     {/* Footer Actions (Small Buttons) */}
//                     <div className="pt-4 border-t border-gray-800/50">
//                         {user ? (
//                             <button 
//                                 onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                                 className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg active:scale-95 transition-all"
//                             >
//                                 <FaSignOutAlt /> Logout
//                             </button>
//                         ) : (
//                             <div className="grid grid-cols-2 gap-3">
//                                 <Link 
//                                     to="/login" 
//                                     onClick={() => setMenuOpen(false)} 
//                                     className="py-2 text-center text-xs font-bold text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 active:scale-95 transition-all"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link 
//                                     to="/signup" 
//                                     onClick={() => setMenuOpen(false)} 
//                                     className="py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg active:scale-95 transition-all"
//                                 >
//                                     Signup
//                                 </Link>
//                             </div>
//                         )}
//                     </div>

//                 </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // Helper Components
// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileLink = ({ to, onClick, children }) => (
//   <Link 
//     to={to} 
//     onClick={onClick} 
//     className="block w-full py-3 px-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors border-b border-gray-800/50 last:border-0"
//   >
//     {children}
//   </Link>
// );

// export default Navbar;







// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaLaptop, FaExclamationTriangle } from "react-icons/fa"; 

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM (Code A Logic - Stable) ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
//   const toastId = `nav-toast-${Date.now()}`;
  
//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3500, position: 'top-center', id: toastId }); 
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled);

//   return (
//     <>
//     <Toaster containerStyle={{ top: 20, zIndex: 9999999 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/60 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      
//       {/* 🔴 MOBILE ONLY WARNING STRIP (Added from Code B) */}
//       <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full">
//          <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//              <FaExclamationTriangle /> For Better/Stable UI, Please Open in Desktop
//          </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20">
        
//         {/* LOGO AREA */}
//         <Link to="/" className="flex items-center gap-3 group relative z-50">
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
//                   <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                 </div>
//                 <div className="relative">
//                     {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                 </div>
//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE (Visible on Mobile) --- */}
//         <div className="flex items-center gap-2 md:hidden">
//             {/* User Avatar Tiny (Visible outside menu) */}
//             {user && (
//                 <Link to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} className="relative">
//                     <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                 </Link>
//             )}
            
//             {/* Hamburger Button */}
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className="text-white p-2 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-transform"
//             >
//                 <FaBars size={20} />
//             </button>
//         </div>
//       </div>

//       {/* --- MOBILE SIDE DRAWER (Sliding Menu) --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <>
//             {/* 1. Backdrop (Click to close) */}
//             {/* ✅ FIXED Z-INDEX: Changed from z-[60] to z-[9998] */}
//             <motion.div 
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setMenuOpen(false)}
//                 className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
//             />

//             {/* 2. Side Drawer */}
//             {/* ✅ FIXED Z-INDEX: Changed from z-[70] to z-[9999] (Highest Priority) */}
//             <motion.div 
//                 initial={{ x: "100%" }} 
//                 animate={{ x: 0 }} 
//                 exit={{ x: "100%" }} 
//                 transition={{ type: "spring", damping: 25, stiffness: 200 }}
//                 className="fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-[#0F172A] border-l border-gray-800 shadow-2xl z-[9999] md:hidden flex flex-col"
//             >
                
//                 {/* Drawer Header */}
//                 <div className="flex items-center justify-between p-5 border-b border-gray-800/50">
//                     <h2 className="text-lg font-bold text-white tracking-wide">Menu</h2>
//                     <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white p-1">
//                         <FaTimes size={20} />
//                     </button>
//                 </div>

//                 {/* Drawer Content */}
//                 <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    
//                     {/* User Info (Inside Menu) */}
//                     {user && (
//                         <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-3 border border-gray-700">
//                              <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-10 h-10 rounded-full object-cover" />
//                              <div>
//                                 <p className="text-sm font-bold text-white">{user.name}</p>
//                                 <p className="text-xs text-cyan-400 uppercase">{user.role}</p>
//                              </div>
//                         </div>
//                     )}

//                     {/* Navigation Links */}
//                     <div className="flex flex-col space-y-2">
//                         <MobileLink to="/" onClick={() => setMenuOpen(false)}>Home</MobileLink>
//                         <MobileLink to="/legalaid" onClick={() => setMenuOpen(false)}>Legal Aid</MobileLink>
//                         {user && (
//                             <MobileLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} onClick={() => setMenuOpen(false)}>
//                                 <span className="text-cyan-400">My Dashboard</span>
//                             </MobileLink>
//                         )}
//                     </div>

//                     {/* Footer Actions (Small Buttons) */}
//                     <div className="pt-4 border-t border-gray-800/50">
//                         {user ? (
//                             <button 
//                                 onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                                 className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg active:scale-95 transition-all"
//                             >
//                                 <FaSignOutAlt /> Logout
//                             </button>
//                         ) : (
//                             <div className="grid grid-cols-2 gap-3">
//                                 <Link 
//                                     to="/login" 
//                                     onClick={() => setMenuOpen(false)} 
//                                     className="py-2 text-center text-xs font-bold text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 active:scale-95 transition-all"
//                                 >
//                                     Login
//                                 </Link>
//                                 <Link 
//                                     to="/signup" 
//                                     onClick={() => setMenuOpen(false)} 
//                                     className="py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg active:scale-95 transition-all"
//                                 >
//                                     Signup
//                                 </Link>
//                             </div>
//                         )}
//                     </div>

//                 </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // Helper Components
// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileLink = ({ to, onClick, children }) => (
//   <Link 
//     to={to} 
//     onClick={onClick} 
//     className="block w-full py-3 px-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors border-b border-gray-800/50 last:border-0"
//   >
//     {children}
//   </Link>
// );

// export default Navbar;























// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard } from "react-icons/fa"; 

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
//   const toastId = type === 'error' ? 'toast-error' : `nav-toast-${Date.now()}`;
//   toast.dismiss(toastId);

//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3500, position: 'top-center', id: toastId }); 
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   // Lock Body Scroll when Menu is Open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [menuOpen]);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled);

//   return (
//     <>
//     <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      
//       {/* 🔴 MOBILE WARNING STRIP */}
//       <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
//          <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//              <FaExclamationTriangle /> For Best Experience, Use Desktop
//          </p>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3 group">
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
//                   <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                 </div>
//                 <div className="relative">
//                     {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                 </div>
//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE BUTTON --- */}
//         <div className="flex items-center gap-2 md:hidden">
//             {user && (
//                 <Link to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} className="relative">
//                     <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                 </Link>
//             )}
            
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className="text-white p-2 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-transform"
//             >
//                 <FaBars size={20} />
//             </button>
//         </div>
//       </div>

//       {/* --- ✨ NEW STYLISH FULL SCREEN MOBILE MENU ✨ --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: "-100%" }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: "-100%" }} 
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             className="fixed inset-0 bg-[#020617] z-[99999] md:hidden flex flex-col"
//             // z-[99999] ensures it covers EVERYTHING
//           >
//             {/* 1. Header with Close Button */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-800/50 bg-black/20 backdrop-blur-sm">
//                 <div className="flex items-center gap-2">
//                     <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
//                     <span className="text-white font-bold text-lg tracking-wider">MENU</span>
//                 </div>
//                 <button 
//                     onClick={() => setMenuOpen(false)} 
//                     className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
//                 >
//                     <FaTimes size={20} />
//                 </button>
//             </div>

//             {/* 2. Main Navigation Links (Big & Centered) */}
//             <div className="flex-1 flex flex-col justify-center items-center gap-6 p-6">
//                 <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
//                 {user && (
//                     <MobileMenuItem 
//                         to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} 
//                         icon={<FaIdCard />} 
//                         label="My Dashboard" 
//                         highlight 
//                         onClick={() => setMenuOpen(false)} 
//                     />
//                 )}
//             </div>

//             {/* 3. User Profile Card & Actions (Bottom) */}
//             <div className="p-6 bg-slate-900/50 border-t border-gray-800/50 pb-10">
//                 {user ? (
//                     <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 border border-slate-700 shadow-xl">
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                                 <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
//                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
//                                 <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
//                                     {user.role === 'senior' ? 'High Command' : user.role}
//                                 </span>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                             className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 rounded-xl shadow-lg active:scale-95 transition-all"
//                         >
//                             <FaSignOutAlt /> Secure Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                         <Link 
//                             to="/login" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
//                         >
//                             Signup
//                         </Link>
//                     </div>
//                 )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // --- Helper Components for Clean Code ---

// // Desktop Nav Link
// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// // Mobile Full Screen Menu Item
// const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
//     <Link 
//         to={to} 
//         onClick={onClick}
//         className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group
//         ${highlight 
//             ? "bg-cyan-500/10 border border-cyan-500/30 text-cyan-400" 
//             : "hover:bg-white/5 border border-transparent hover:border-white/10 text-gray-300 hover:text-white"}`}
//     >
//         <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
//             {icon}
//         </span>
//         <span className="text-lg font-bold tracking-wide">{label}</span>
//         {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
//     </Link>
// );

// export default Navbar;
































// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard } from "react-icons/fa"; 

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
//   const toastId = type === 'error' ? 'toast-error' : `nav-toast-${Date.now()}`;
//   toast.dismiss(toastId);

//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3500, position: 'top-center', id: toastId }); 
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   // Lock Body Scroll when Menu is Open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [menuOpen]);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   // ✅ FIX: Logo visibility logic
//   const showLogo = !isHome || (isHome && scrolled) || menuOpen;

//   // ✅ FIX: Agar Menu Open hai, toh Navbar TRANSPARENT rahega (Blur effect hata diya)
//   // Isse background black hi rahega aur transparent nahi hoga.
//   const navbarClasses = menuOpen 
//     ? "bg-transparent border-transparent"  // Jab Menu open ho -> No Blur, No Background on Nav
//     : scrolled 
//       ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" // Scroll pe -> Blur Effect
//       : "bg-transparent border-b border-transparent"; // Top pe -> Transparent

//   return (
//     <>
//     <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} />

//     {/* Navbar Container */}
//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      
//       {/* 🔴 MOBILE WARNING STRIP (Hide when menu is open to clean up UI) */}
//       {!menuOpen && (
//         <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
//            <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//                <FaExclamationTriangle /> For Best Experience, Use Desktop
//            </p>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
//                   <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                 </div>
//                 <div className="relative">
//                     {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                 </div>
//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE BUTTON --- */}
//         <div className="flex items-center gap-2 md:hidden">
//             {!menuOpen && user && (
//                 <Link to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} className="relative">
//                     <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                 </Link>
//             )}
            
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className={`p-2 rounded-lg transition-transform ${menuOpen ? "text-white" : "text-white bg-white/5 border border-white/10"}`}
//             >
//                 {/* Agar menu open hai toh button gayab kar do ya cross dikhao, filhal menu ke andar cross hai isliye yahan sirf Hamburger */}
//                 {!menuOpen && <FaBars size={20} />}
//             </button>
//         </div>
//       </div>

//       {/* --- ✨ STYLISH FULL SCREEN MOBILE MENU ✨ --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: "-100%" }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: "-100%" }} 
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             // ✅ FIX: Force Solid Black Background (bg-black) to prevent transparency issues
//             className="fixed inset-0 bg-black z-[99999] md:hidden flex flex-col h-screen w-screen overflow-hidden"
//           >
//             {/* 1. Header with Close Button */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black z-50">
//                 <div className="flex items-center gap-2">
//                     <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
//                     <span className="text-white font-bold text-lg tracking-wider">MENU</span>
//                 </div>
//                 <button 
//                     onClick={() => setMenuOpen(false)} 
//                     className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
//                 >
//                     <FaTimes size={20} />
//                 </button>
//             </div>

//             {/* 2. Main Navigation Links (Big & Centered) */}
//             <div className="flex-1 flex flex-col justify-center items-center gap-4 p-6 bg-black overflow-y-auto">
//                 <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
//                 {user && (
//                     <MobileMenuItem 
//                         to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} 
//                         icon={<FaIdCard />} 
//                         label="My Dashboard" 
//                         highlight 
//                         onClick={() => setMenuOpen(false)} 
//                     />
//                 )}
//             </div>

//             {/* 3. User Profile Card & Actions (Bottom) */}
//             <div className="p-6 bg-gray-900 border-t border-gray-800 pb-10 z-50">
//                 {user ? (
//                     <div className="bg-black rounded-2xl p-5 border border-gray-800 shadow-xl">
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                                 <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
//                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
//                                 <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
//                                     {user.role === 'senior' ? 'High Command' : user.role}
//                                 </span>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                             className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg active:scale-95 transition-all"
//                         >
//                             <FaSignOutAlt /> Secure Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                         <Link 
//                             to="/login" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
//                         >
//                             Signup
//                         </Link>
//                     </div>
//                 )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // --- Helper Components for Clean Code ---

// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
//     <Link 
//         to={to} 
//         onClick={onClick}
//         className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group
//         ${highlight 
//             ? "bg-cyan-900/20 border border-cyan-500/30 text-cyan-400" 
//             : "bg-gray-900/30 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"}`}
//     >
//         <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
//             {icon}
//         </span>
//         <span className="text-lg font-bold tracking-wide">{label}</span>
//         {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
//     </Link>
// );

// export default Navbar;













// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard } from "react-icons/fa"; 

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM (Fixed) ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
  
//   // ✅ FIX: Dismiss ALL existing toasts before showing a new one
//   toast.dismiss(); 

//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3000, position: 'top-center' }); // Removed fixed ID to allow fresh renders
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   // Lock Body Scroll when Menu is Open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [menuOpen]);

//   const handleLogout = () => {
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled) || menuOpen;

//   const navbarClasses = menuOpen 
//     ? "bg-transparent border-transparent"
//     : scrolled 
//       ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" 
//       : "bg-transparent border-b border-transparent";

//   return (
//     <>
//     {/* ✅ FIX: Added limit={1} to prevent stacking */}
//     <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} toastOptions={{ duration: 3000 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      
//       {!menuOpen && (
//         <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
//            <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//                <FaExclamationTriangle /> For Best Experience, Use Desktop
//            </p>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
//                   <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                 </div>
//                 <div className="relative">
//                     {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                 </div>
//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE BUTTON --- */}
//         <div className="flex items-center gap-2 md:hidden">
//             {!menuOpen && user && (
//                 <Link to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} className="relative">
//                     <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                 </Link>
//             )}
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className={`p-2 rounded-lg transition-transform ${menuOpen ? "text-white" : "text-white bg-white/5 border border-white/10"}`}
//             >
//                 {!menuOpen && <FaBars size={20} />}
//             </button>
//         </div>
//       </div>

//       {/* --- ✨ STYLISH FULL SCREEN MOBILE MENU ✨ --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: "-100%" }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: "-100%" }} 
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             className="fixed inset-0 bg-black z-[99999] md:hidden flex flex-col h-screen w-screen overflow-hidden"
//           >
//             {/* 1. Header with Close Button */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black z-50 shrink-0">
//                 <div className="flex items-center gap-2">
//                     <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
//                     <span className="text-white font-bold text-lg tracking-wider">MENU</span>
//                 </div>
//                 <button 
//                     onClick={() => setMenuOpen(false)} 
//                     className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
//                 >
//                     <FaTimes size={20} />
//                 </button>
//             </div>

//             {/* 2. User Profile / Auth Section (MOVED TO TOP) */}
//             <div className="p-6 bg-black z-50 shrink-0">
//                 {user ? (
//                     <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                                 <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
//                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
//                                 <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
//                                     {user.role === 'senior' ? 'High Command' : user.role}
//                                 </span>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                             className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg active:scale-95 transition-all"
//                         >
//                             <FaSignOutAlt /> Secure Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                         <Link 
//                             to="/login" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
//                         >
//                             Signup
//                         </Link>
//                     </div>
//                 )}
//             </div>

//             {/* 3. Main Navigation Links (Below Profile) */}
//             <div className="flex-1 flex flex-col items-center gap-4 px-6 pb-6 bg-black overflow-y-auto">
//                 <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
//                 {user && (
//                     <MobileMenuItem 
//                         to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} 
//                         icon={<FaIdCard />} 
//                         label="My Dashboard" 
//                         highlight 
//                         onClick={() => setMenuOpen(false)} 
//                     />
//                 )}
//             </div>

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // --- Helper Components ---

// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
//     <Link 
//         to={to} 
//         onClick={onClick}
//         className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group shrink-0
//         ${highlight 
//             ? "bg-cyan-900/20 border border-cyan-500/30 text-cyan-400" 
//             : "bg-gray-900/30 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"}`}
//     >
//         <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
//             {icon}
//         </span>
//         <span className="text-lg font-bold tracking-wide">{label}</span>
//         {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
//     </Link>
// );

// export default Navbar;




















// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard } from "react-icons/fa"; 
// import axios from 'axios'; // ✅ IMPORTED AXIOS

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM (Fixed) ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
  
//   // ✅ FIX: Dismiss ALL existing toasts before showing a new one
//   toast.dismiss(); 

//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3000, position: 'top-center' }); // Removed fixed ID to allow fresh renders
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   // Lock Body Scroll when Menu is Open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [menuOpen]);

//   // ✅ UPDATED LOGOUT LOGIC
//   const handleLogout = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//         try {
//             // Notify backend about logout (triggers Last Seen update & Email Alert)
//             await axios.post("https://crimetrack-api.onrender.com/api/users/logout", { userId: userInfo._id });
//         } catch (error) {
//             console.error("Logout Sync Error:", error);
//         }
//     }

//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled) || menuOpen;

//   const navbarClasses = menuOpen 
//     ? "bg-transparent border-transparent"
//     : scrolled 
//       ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" 
//       : "bg-transparent border-b border-transparent";

//   return (
//     <>
//     {/* ✅ FIX: Added limit={1} to prevent stacking */}
//     <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} toastOptions={{ duration: 3000 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      
//       {!menuOpen && (
//         <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
//            <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//                <FaExclamationTriangle /> For Best Experience, Use Desktop
//            </p>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
//                 <div className="text-right">
//                   <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
//                   <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                 </div>
//                 <div className="relative">
//                     {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                 </div>
//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
//               </div>
//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE BUTTON --- */}
//         <div className="flex items-center gap-2 md:hidden">
//             {!menuOpen && user && (
//                 <Link to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} className="relative">
//                     <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                 </Link>
//             )}
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className={`p-2 rounded-lg transition-transform ${menuOpen ? "text-white" : "text-white bg-white/5 border border-white/10"}`}
//             >
//                 {!menuOpen && <FaBars size={20} />}
//             </button>
//         </div>
//       </div>

//       {/* --- ✨ STYLISH FULL SCREEN MOBILE MENU ✨ --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: "-100%" }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: "-100%" }} 
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             className="fixed inset-0 bg-black z-[99999] md:hidden flex flex-col h-screen w-screen overflow-hidden"
//           >
//             {/* 1. Header with Close Button */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black z-50 shrink-0">
//                 <div className="flex items-center gap-2">
//                     <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
//                     <span className="text-white font-bold text-lg tracking-wider">MENU</span>
//                 </div>
//                 <button 
//                     onClick={() => setMenuOpen(false)} 
//                     className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
//                 >
//                     <FaTimes size={20} />
//                 </button>
//             </div>

//             {/* 2. User Profile / Auth Section (MOVED TO TOP) */}
//             <div className="p-6 bg-black z-50 shrink-0">
//                 {user ? (
//                     <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
//                         <div className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                                 <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
//                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
//                                 <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
//                                     {user.role === 'senior' ? 'High Command' : user.role}
//                                 </span>
//                             </div>
//                         </div>
//                         <button 
//                             onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                             className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg active:scale-95 transition-all"
//                         >
//                             <FaSignOutAlt /> Secure Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                         <Link 
//                             to="/login" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
//                         >
//                             Signup
//                         </Link>
//                     </div>
//                 )}
//             </div>

//             {/* 3. Main Navigation Links (Below Profile) */}
//             <div className="flex-1 flex flex-col items-center gap-4 px-6 pb-6 bg-black overflow-y-auto">
//                 <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
//                 {user && (
//                     <MobileMenuItem 
//                         to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} 
//                         icon={<FaIdCard />} 
//                         label="My Dashboard" 
//                         highlight 
//                         onClick={() => setMenuOpen(false)} 
//                     />
//                 )}
//             </div>

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // --- Helper Components ---

// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
//     <Link 
//         to={to} 
//         onClick={onClick}
//         className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group shrink-0
//         ${highlight 
//             ? "bg-cyan-900/20 border border-cyan-500/30 text-cyan-400" 
//             : "bg-gray-900/30 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"}`}
//     >
//         <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
//             {icon}
//         </span>
//         <span className="text-lg font-bold tracking-wide">{label}</span>
//         {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
//     </Link>
// );

// export default Navbar;












//changes from 09 feb 



// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard } from "react-icons/fa"; 
// import axios from 'axios'; // ✅ IMPORTED AXIOS

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM (Fixed) ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
  
//   // ✅ FIX: Dismiss ALL existing toasts before showing a new one
//   toast.dismiss(); 

//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3000, position: 'top-center' }); // Removed fixed ID to allow fresh renders
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   // Lock Body Scroll when Menu is Open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [menuOpen]);

//   // ✅ UPDATED LOGOUT LOGIC
//   const handleLogout = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//         try {
//             // Notify backend about logout (triggers Last Seen update & Email Alert)
//             await axios.post("https://crimetrack-api.onrender.com/api/users/logout", { userId: userInfo._id });
//         } catch (error) {
//             console.error("Logout Sync Error:", error);
//         }
//     }

//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled) || menuOpen;

//   const navbarClasses = menuOpen 
//     ? "bg-transparent border-transparent"
//     : scrolled 
//       ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" 
//       : "bg-transparent border-b border-transparent";

//   return (
//     <>
//     {/* ✅ FIX: Added limit={1} to prevent stacking */}
//     <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} toastOptions={{ duration: 3000 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      
//       {!menuOpen && (
//         <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
//            <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//                <FaExclamationTriangle /> For Best Experience, Use Desktop
//            </p>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
              
//               {/* ✅ UPDATED: Wrapped Profile Section with Link to /profile */}
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
//                 <Link to="/profile" className="text-right cursor-pointer hover:opacity-80 transition-opacity">
//                   <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
//                   <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                 </Link>
//                 <Link to="/profile" className="relative cursor-pointer hover:scale-105 transition-transform">
//                     {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                 </Link>
//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
//               </div>

//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE BUTTON --- */}
//         <div className="flex items-center gap-2 md:hidden">
//             {!menuOpen && user && (
//                 // ✅ UPDATED: Changed Mobile Icon Link to /profile
//                 <Link to="/profile" className="relative">
//                     <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
//                     <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                 </Link>
//             )}
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className={`p-2 rounded-lg transition-transform ${menuOpen ? "text-white" : "text-white bg-white/5 border border-white/10"}`}
//             >
//                 {!menuOpen && <FaBars size={20} />}
//             </button>
//         </div>
//       </div>

//       {/* --- ✨ STYLISH FULL SCREEN MOBILE MENU ✨ --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: "-100%" }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: "-100%" }} 
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             className="fixed inset-0 bg-black z-[99999] md:hidden flex flex-col h-screen w-screen overflow-hidden"
//           >
//             {/* 1. Header with Close Button */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black z-50 shrink-0">
//                 <div className="flex items-center gap-2">
//                     <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
//                     <span className="text-white font-bold text-lg tracking-wider">MENU</span>
//                 </div>
//                 <button 
//                     onClick={() => setMenuOpen(false)} 
//                     className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
//                 >
//                     <FaTimes size={20} />
//                 </button>
//             </div>

//             {/* 2. User Profile / Auth Section (MOVED TO TOP) */}
//             <div className="p-6 bg-black z-50 shrink-0">
//                 {user ? (
//                     <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
//                         {/* ✅ UPDATED: Wrapped Profile Info with Link to /profile */}
//                         <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                                 <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
//                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
//                                 <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
//                                     {user.role === 'senior' ? 'High Command' : user.role}
//                                 </span>
//                             </div>
//                         </Link>
//                         <button 
//                             onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                             className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg active:scale-95 transition-all"
//                         >
//                             <FaSignOutAlt /> Secure Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                         <Link 
//                             to="/login" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
//                         >
//                             Signup
//                         </Link>
//                     </div>
//                 )}
//             </div>

//             {/* 3. Main Navigation Links (Below Profile) */}
//             <div className="flex-1 flex flex-col items-center gap-4 px-6 pb-6 bg-black overflow-y-auto">
//                 <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
//                 {user && (
//                     <MobileMenuItem 
//                         to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} 
//                         icon={<FaIdCard />} 
//                         label="My Dashboard" 
//                         highlight 
//                         onClick={() => setMenuOpen(false)} 
//                     />
//                 )}
//             </div>

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // --- Helper Components ---

// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
//     <Link 
//         to={to} 
//         onClick={onClick}
//         className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group shrink-0
//         ${highlight 
//             ? "bg-cyan-900/20 border border-cyan-500/30 text-cyan-400" 
//             : "bg-gray-900/30 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"}`}
//     >
//         <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
//             {icon}
//         </span>
//         <span className="text-lg font-bold tracking-wide">{label}</span>
//         {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
//     </Link>
// );

// export default Navbar;











// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard, FaEdit } from "react-icons/fa"; 
// import axios from 'axios'; 

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
//   toast.dismiss(); 
//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3000, position: 'top-center' });
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   // ✅ New State for Mobile Hint
//   const [showMobileHint, setShowMobileHint] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   // ✅ MOBILE HINT LOGIC (2 Minutes Interval, 3 Times, 5 Seconds Duration)
//   useEffect(() => {
//     if (!user || window.innerWidth > 768) return; // Only for logged-in users on mobile

//     let count = 0;
//     const maxCount = 3;
//     const intervalTime = 2 * 60 * 1000; // 2 Minutes (120000 ms)
//     // NOTE: Testing ke liye 2 mins bahut lamba hai, agar fast check karna ho toh '10000' (10 sec) kar dena.

//     const timer = setInterval(() => {
//         if (count >= maxCount) {
//             clearInterval(timer);
//             return;
//         }
        
//         setShowMobileHint(true);
//         // Hide after 5 seconds
//         setTimeout(() => setShowMobileHint(false), 5000);
        
//         count++;
//     }, intervalTime);

//     return () => clearInterval(timer);
//   }, [user]);

//   // Lock Body Scroll when Menu is Open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [menuOpen]);

//   const handleLogout = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo && userInfo._id) {
//         try {
//             await axios.post("https://crimetrack-api.onrender.com/api/users/logout", { userId: userInfo._id });
//         } catch (error) {
//             console.error("Logout Sync Error:", error);
//         }
//     }
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled) || menuOpen;

//   const navbarClasses = menuOpen 
//     ? "bg-transparent border-transparent"
//     : scrolled 
//       ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" 
//       : "bg-transparent border-b border-transparent";

//   return (
//     <>
//     <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} toastOptions={{ duration: 3000 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      
//       {!menuOpen && (
//         <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
//            <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//                <FaExclamationTriangle /> For Best Experience, Use Desktop
//            </p>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
//               <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
              
//               {/* ✅ UPDATED: DESKTOP PROFILE SECTION WITH HOVER & TOOLTIP */}
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6 group relative">
                
//                 {/* Profile Link Wrapper */}
//                 <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-500/50 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] group">
//                     <div className="text-right">
//                         <p className="text-sm font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">{user.name}</p>
//                         <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                     </div>
//                     <div className="relative">
//                         {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md group-hover:border-cyan-400 transition-colors" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                     </div>
//                 </Link>

//                 {/* ✅ TOOLTIP ON HOVER */}
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                     <div className="bg-black/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/30 whitespace-nowrap shadow-lg flex items-center gap-1">
//                         <FaEdit /> Click to Edit Profile
//                     </div>
//                 </div>

//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm ml-2">Logout</button>
//               </div>

//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE BUTTON --- */}
//         <div className="flex items-center gap-3 md:hidden">
//             {!menuOpen && user && (
//                 <div className="relative">
//                     <Link to="/profile" className="relative block">
//                         <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-9 h-9 rounded-full object-cover border border-cyan-500/50 shadow-lg" />
//                         <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                     </Link>

//                     {/* ✅ MOBILE HINT (Appears every 2 mins for 5 sec) */}
//                     <AnimatePresence>
//                         {showMobileHint && (
//                             <motion.div 
//                                 initial={{ opacity: 0, y: -10, scale: 0.8 }} 
//                                 animate={{ opacity: 1, y: 0, scale: 1 }} 
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 className="absolute top-11 right-0 w-[100px] bg-cyan-500/90 text-white text-[9px] font-bold px-2 py-1 rounded-lg text-center shadow-xl border border-cyan-300 z-50 arrow-top"
//                             >
//                                 Tap to Edit Profile
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             )}
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className={`p-2 rounded-lg transition-transform ${menuOpen ? "text-white" : "text-white bg-white/5 border border-white/10"}`}
//             >
//                 {!menuOpen && <FaBars size={20} />}
//             </button>
//         </div>
//       </div>

//       {/* --- MOBILE MENU (UNCHANGED) --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: "-100%" }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: "-100%" }} 
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             className="fixed inset-0 bg-black z-[99999] md:hidden flex flex-col h-screen w-screen overflow-hidden"
//           >
//             {/* 1. Header with Close Button */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black z-50 shrink-0">
//                 <div className="flex items-center gap-2">
//                     <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
//                     <span className="text-white font-bold text-lg tracking-wider">MENU</span>
//                 </div>
//                 <button 
//                     onClick={() => setMenuOpen(false)} 
//                     className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
//                 >
//                     <FaTimes size={20} />
//                 </button>
//             </div>

//             {/* 2. User Profile / Auth Section */}
//             <div className="p-6 bg-black z-50 shrink-0">
//                 {user ? (
//                     <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
//                         <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                                 <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
//                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
//                                 <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
//                                     {user.role === 'senior' ? 'High Command' : user.role}
//                                 </span>
//                             </div>
//                         </Link>
//                         <button 
//                             onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                             className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg active:scale-95 transition-all"
//                         >
//                             <FaSignOutAlt /> Secure Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                         <Link 
//                             to="/login" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
//                         >
//                             Signup
//                         </Link>
//                     </div>
//                 )}
//             </div>

//             {/* 3. Main Navigation Links */}
//             <div className="flex-1 flex flex-col items-center gap-4 px-6 pb-6 bg-black overflow-y-auto">
//                 <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
//                 {user && (
//                     <MobileMenuItem 
//                         to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} 
//                         icon={<FaIdCard />} 
//                         label="My Dashboard" 
//                         highlight 
//                         onClick={() => setMenuOpen(false)} 
//                     />
//                 )}
//             </div>

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // --- Helper Components ---

// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
//     <Link 
//         to={to} 
//         onClick={onClick}
//         className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group shrink-0
//         ${highlight 
//             ? "bg-cyan-900/20 border border-cyan-500/30 text-cyan-400" 
//             : "bg-gray-900/30 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"}`}
//     >
//         <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
//             {icon}
//         </span>
//         <span className="text-lg font-bold tracking-wide">{label}</span>
//         {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
//     </Link>
// );

// export default Navbar;

























// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import { toast, Toaster } from "react-hot-toast"; 
// import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard, FaEdit } from "react-icons/fa"; 
// import axios from 'axios'; 

// // --- 🔔 CENTRALIZED NOTIFICATION SYSTEM ---
// const playNotificationSound = () => {
//   const audio = new Audio('/notification.mp3');
//   audio.play().catch(err => console.log("Sound play blocked:", err));
// };

// const triggerNotification = (type, title, message) => {
//   playNotificationSound();
//   toast.dismiss(); 
//   toast.custom((t) => (
//     <motion.div 
//       initial={{ opacity: 0, y: -50, scale: 0.9 }}
//       animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
//       className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
//     >
//       <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
//         {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
//       </div>
//       <div className="flex-1 min-w-0">
//         <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
//         <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
//       </div>
//       <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
//         <FaTimes size={14} />
//       </button>
//     </motion.div>
//   ), { duration: 3000, position: 'top-center' });
// };

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [user, setUser] = useState(null);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   // ✅ New State for Mobile Hint
//   const [showMobileHint, setShowMobileHint] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     const userInfo = localStorage.getItem("userInfo");
//     if (userInfo) setUser(JSON.parse(userInfo));
//     else setUser(null);
//   }, [location]);

//   // ✅ MOBILE HINT LOGIC (2 Minutes Interval, 3 Times, 5 Seconds Duration)
//   useEffect(() => {
//     if (!user || window.innerWidth > 768) return; // Only for logged-in users on mobile

//     let count = 0;
//     const maxCount = 3;
//     const intervalTime = 2 * 60 * 1000; // 2 Minutes (120000 ms)

//     const timer = setInterval(() => {
//         if (count >= maxCount) {
//             clearInterval(timer);
//             return;
//         }
        
//         setShowMobileHint(true);
//         // Hide after 5 seconds
//         setTimeout(() => setShowMobileHint(false), 5000);
        
//         count++;
//     }, intervalTime);

//     return () => clearInterval(timer);
//   }, [user]);

//   // Lock Body Scroll when Menu is Open
//   useEffect(() => {
//     if (menuOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//   }, [menuOpen]);

//   const handleLogout = async () => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     if (userInfo && userInfo._id) {
//         try {
//             await axios.post("https://crimetrack-api.onrender.com/api/users/logout", { userId: userInfo._id });
//         } catch (error) {
//             console.error("Logout Sync Error:", error);
//         }
//     }
//     localStorage.removeItem("userInfo");
//     setUser(null);
//     triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
//     setTimeout(() => { navigate("/"); }, 1000);
//   };

//   const isActive = (path) => location.pathname === path;
//   const isHome = location.pathname === "/";
//   const showLogo = !isHome || (isHome && scrolled) || menuOpen;

//   const navbarClasses = menuOpen 
//     ? "bg-transparent border-transparent"
//     : scrolled 
//       ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" 
//       : "bg-transparent border-b border-transparent";

//   return (
//     <>
//     <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} toastOptions={{ duration: 3000 }} />

//     <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      
//       {!menuOpen && (
//         <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
//            <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
//                <FaExclamationTriangle /> For Best Experience, Use Desktop
//            </p>
//         </div>
//       )}

//       <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
//         {/* LOGO */}
//         <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
//           {showLogo && (
//             <motion.img 
//               layoutId="crimetrack-logo-morph"
//               src="/CrimeTrack.png"
//               alt="CrimeTrack"
//               className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ duration: 0.6 }} 
//             />
//           )}
//         </Link>

//         {/* --- DESKTOP MENU --- */}
//         <div className="hidden md:flex items-center space-x-8">
//           <NavLink to="/" active={isActive("/")}>Home</NavLink>
//           <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
//           {user ? (
//             <div className="flex items-center gap-6">
              
//               {/* ✅ UPDATED DASHBOARD LINK (Supports Admin) */}
//               <NavLink 
//                 to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : user.role === 'admin' ? "/admin" : "/police"} 
//                 active={isActive("/user") || isActive("/police") || isActive("/senior") || isActive("/admin")}
//               >
//                 Dashboard
//               </NavLink>
              
//               {/* ✅ DESKTOP PROFILE SECTION */}
//               <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6 group relative">
                
//                 {/* Profile Link Wrapper */}
//                 <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-500/50 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] group">
//                     <div className="text-right">
//                         <p className="text-sm font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">{user.name}</p>
//                         <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
//                     </div>
//                     <div className="relative">
//                         {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md group-hover:border-cyan-400 transition-colors" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
//                     </div>
//                 </Link>

//                 {/* ✅ TOOLTIP ON HOVER */}
//                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
//                     <div className="bg-black/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/30 whitespace-nowrap shadow-lg flex items-center gap-1">
//                         <FaEdit /> Click to Edit Profile
//                     </div>
//                 </div>

//                 <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm ml-2">Logout</button>
//               </div>

//             </div>
//           ) : (
//             <div className="flex items-center gap-4">
//               <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
//               <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
//             </div>
//           )}
//         </div>

//         {/* --- MOBILE TOGGLE BUTTON --- */}
//         <div className="flex items-center gap-3 md:hidden">
//             {!menuOpen && user && (
//                 <div className="relative">
//                     <Link to="/profile" className="relative block">
//                         <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-9 h-9 rounded-full object-cover border border-cyan-500/50 shadow-lg" />
//                         <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
//                     </Link>

//                     {/* ✅ MOBILE HINT */}
//                     <AnimatePresence>
//                         {showMobileHint && (
//                             <motion.div 
//                                 initial={{ opacity: 0, y: -10, scale: 0.8 }} 
//                                 animate={{ opacity: 1, y: 0, scale: 1 }} 
//                                 exit={{ opacity: 0, scale: 0.8 }}
//                                 className="absolute top-11 right-0 w-[100px] bg-cyan-500/90 text-white text-[9px] font-bold px-2 py-1 rounded-lg text-center shadow-xl border border-cyan-300 z-50 arrow-top"
//                             >
//                                 Tap to Edit Profile
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
//             )}
//             <button 
//                 onClick={() => setMenuOpen(true)} 
//                 className={`p-2 rounded-lg transition-transform ${menuOpen ? "text-white" : "text-white bg-white/5 border border-white/10"}`}
//             >
//                 {!menuOpen && <FaBars size={20} />}
//             </button>
//         </div>
//       </div>

//       {/* --- MOBILE MENU --- */}
//       <AnimatePresence>
//         {menuOpen && (
//           <motion.div 
//             initial={{ opacity: 0, y: "-100%" }} 
//             animate={{ opacity: 1, y: 0 }} 
//             exit={{ opacity: 0, y: "-100%" }} 
//             transition={{ type: "spring", stiffness: 100, damping: 20 }}
//             className="fixed inset-0 bg-black z-[99999] md:hidden flex flex-col h-screen w-screen overflow-hidden"
//           >
//             {/* Header with Close Button */}
//             <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black z-50 shrink-0">
//                 <div className="flex items-center gap-2">
//                     <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
//                     <span className="text-white font-bold text-lg tracking-wider">MENU</span>
//                 </div>
//                 <button 
//                     onClick={() => setMenuOpen(false)} 
//                     className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
//                 >
//                     <FaTimes size={20} />
//                 </button>
//             </div>

//             {/* User Profile / Auth Section */}
//             <div className="p-6 bg-black z-50 shrink-0">
//                 {user ? (
//                     <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
//                         <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 mb-4">
//                             <div className="relative">
//                                 <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
//                                 <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
//                             </div>
//                             <div>
//                                 <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
//                                 <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
//                                     {user.role === 'senior' ? 'High Command' : user.role}
//                                 </span>
//                             </div>
//                         </Link>
//                         <button 
//                             onClick={() => { handleLogout(); setMenuOpen(false); }} 
//                             className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg active:scale-95 transition-all"
//                         >
//                             <FaSignOutAlt /> Secure Logout
//                         </button>
//                     </div>
//                 ) : (
//                     <div className="grid grid-cols-2 gap-4">
//                         <Link 
//                             to="/login" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
//                         >
//                             Login
//                         </Link>
//                         <Link 
//                             to="/signup" 
//                             onClick={() => setMenuOpen(false)} 
//                             className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
//                         >
//                             Signup
//                         </Link>
//                     </div>
//                 )}
//             </div>

//             {/* Main Navigation Links */}
//             <div className="flex-1 flex flex-col items-center gap-4 px-6 pb-6 bg-black overflow-y-auto">
//                 <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
//                 <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
//                 {user && (
//                     <MobileMenuItem 
//                         to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : user.role === 'admin' ? "/admin" : "/police"} 
//                         icon={<FaIdCard />} 
//                         label="My Dashboard" 
//                         highlight 
//                         onClick={() => setMenuOpen(false)} 
//                     />
//                 )}
//             </div>

//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//     </>
//   );
// };

// // --- Helper Components ---

// const NavLink = ({ to, children, active }) => (
//   <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
//     {children}
//     {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
//   </Link>
// );

// const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
//     <Link 
//         to={to} 
//         onClick={onClick}
//         className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group shrink-0
//         ${highlight 
//             ? "bg-cyan-900/20 border border-cyan-500/30 text-cyan-400" 
//             : "bg-gray-900/30 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"}`}
//     >
//         <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
//             {icon}
//         </span>
//         <span className="text-lg font-bold tracking-wide">{label}</span>
//         {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
//     </Link>
// );

// export default Navbar;














import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast"; 
import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars, FaExclamationTriangle, FaHome, FaGavel, FaIdCard, FaEdit } from "react-icons/fa"; 
import axios from 'axios'; 

// --- 🔔 CENTRALIZED NOTIFICATION SYSTEM ---
const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.play().catch(err => console.log("Sound play blocked:", err));
};

const triggerNotification = (type, title, message) => {
  playNotificationSound();
  toast.dismiss(); 
  toast.custom((t) => (
    <motion.div 
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: t.visible ? 1 : 0, y: t.visible ? 0 : -50, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`flex items-center w-auto max-w-[90vw] md:max-w-sm ${type === 'success' ? 'bg-slate-900/95 border-l-4 border-green-500' : 'bg-slate-900/95 border-l-4 border-red-500'} rounded-r-lg shadow-2xl p-3 gap-3 pointer-events-auto backdrop-blur-md mt-4 mx-auto`}
    >
      <div className={`p-1.5 rounded-full shrink-0 ${type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
        {type === 'success' ? <FaCheckCircle size={16} /> : <FaSignOutAlt size={16} />}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-bold ${type === 'success' ? 'text-green-400' : 'text-red-400'}`}>{title}</h4>
        <p className="text-xs text-slate-300 mt-0.5 leading-tight">{message}</p>
      </div>
      <button onClick={(e) => { e.stopPropagation(); toast.dismiss(t.id); }} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
        <FaTimes size={14} />
      </button>
    </motion.div>
  ), { duration: 3000, position: 'top-center' });
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // ✅ New State for Mobile Hint
  const [showMobileHint, setShowMobileHint] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) setUser(JSON.parse(userInfo));
    else setUser(null);
  }, [location]);

  // ✅ MOBILE HINT LOGIC (2 Minutes Interval, 3 Times, 5 Seconds Duration)
  useEffect(() => {
    if (!user || window.innerWidth > 768) return; // Only for logged-in users on mobile

    let count = 0;
    const maxCount = 3;
    const intervalTime = 2 * 60 * 1000; // 2 Minutes (120000 ms)

    const timer = setInterval(() => {
        if (count >= maxCount) {
            clearInterval(timer);
            return;
        }
        
        setShowMobileHint(true);
        // Hide after 5 seconds
        setTimeout(() => setShowMobileHint(false), 5000);
        
        count++;
    }, intervalTime);

    return () => clearInterval(timer);
  }, [user]);

  // Lock Body Scroll when Menu is Open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [menuOpen]);

  const handleLogout = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo && userInfo._id) {
        try {
            await axios.post("https://crimetrack-api.onrender.com/api/users/logout", { userId: userInfo._id });
        } catch (error) {
            console.error("Logout Sync Error:", error);
        }
    }
    localStorage.removeItem("userInfo");
    setUser(null);
    triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
    setTimeout(() => { navigate("/"); }, 1000);
  };

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === "/";
  const showLogo = !isHome || (isHome && scrolled) || menuOpen;

  const navbarClasses = menuOpen 
    ? "bg-transparent border-transparent"
    : scrolled 
      ? "bg-black/80 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" 
      : "bg-transparent border-b border-transparent";

  return (
    <>
    <Toaster position="top-center" reverseOrder={false} gutter={8} containerStyle={{ top: 20, zIndex: 9999999 }} toastOptions={{ duration: 3000 }} />

    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navbarClasses}`}>
      
      {!menuOpen && (
        <div className="md:hidden bg-amber-500/10 border-b border-amber-500/20 w-full relative z-[60]">
           <p className="text-[10px] font-bold text-amber-300 text-center py-1.5 animate-pulse flex items-center justify-center gap-2 tracking-wide">
               <FaExclamationTriangle /> For Best Experience, Use Desktop
           </p>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20 relative z-[60]">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group" onClick={() => setMenuOpen(false)}>
          {showLogo && (
            <motion.img 
              layoutId="crimetrack-logo-morph"
              src="/CrimeTrack.png"
              alt="CrimeTrack"
              className="h-10 w-16 md:h-22 md:w-30 mt-1 md:mt-0 object-contain drop-shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }} 
            />
          )}
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={isActive("/")}>Home</NavLink>
          <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
          {user ? (
            <div className="flex items-center gap-6">
              
              {/* ✅ UPDATED DASHBOARD LINK (Supports Admin) */}
              <NavLink 
                to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : user.role === 'admin' ? "/admin" : "/police"} 
                active={isActive("/user") || isActive("/police") || isActive("/senior") || isActive("/admin")}
              >
                Dashboard
              </NavLink>
              
              {/* ✅ DESKTOP PROFILE SECTION */}
              <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6 group relative">
                
                {/* Profile Link Wrapper */}
                <Link to="/profile" className="flex items-center gap-3 p-2 rounded-xl transition-all duration-300 border border-transparent hover:border-cyan-500/50 hover:bg-white/5 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] group">
                    <div className="text-right">
                        <p className="text-sm font-bold text-white leading-tight group-hover:text-cyan-400 transition-colors">{user.name}</p>
                        <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
                    </div>
                    <div className="relative">
                        {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md group-hover:border-cyan-400 transition-colors" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
                    </div>
                </Link>

                {/* ✅ TOOLTIP ON HOVER */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-500/30 whitespace-nowrap shadow-lg flex items-center gap-1">
                        <FaEdit /> Click to Edit Profile
                    </div>
                </div>

                <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm ml-2">Logout</button>
              </div>

            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
              <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
            </div>
          )}
        </div>

        {/* --- MOBILE TOGGLE BUTTON --- */}
        <div className="flex items-center gap-3 md:hidden">
            {!menuOpen && user && (
                <div className="relative">
                    <Link to="/profile" className="relative block">
                        <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-9 h-9 rounded-full object-cover border border-cyan-500/50 shadow-lg" />
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
                    </Link>

                    {/* ✅ MOBILE HINT */}
                    <AnimatePresence>
                        {showMobileHint && (
                            <motion.div 
                                initial={{ opacity: 0, y: -10, scale: 0.8 }} 
                                animate={{ opacity: 1, y: 0, scale: 1 }} 
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute top-11 right-0 w-[100px] bg-cyan-500/90 text-white text-[9px] font-bold px-2 py-1 rounded-lg text-center shadow-xl border border-cyan-300 z-50 arrow-top"
                            >
                                Tap to Edit Profile
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
            <button 
                onClick={() => setMenuOpen(true)} 
                className={`p-2 rounded-lg transition-transform ${menuOpen ? "text-white" : "text-white bg-white/5 border border-white/10"}`}
            >
                {!menuOpen && <FaBars size={20} />}
            </button>
        </div>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: "-100%" }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: "-100%" }} 
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="fixed inset-0 bg-black z-[99999] md:hidden flex flex-col h-screen w-screen overflow-hidden"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800 bg-black z-50 shrink-0">
                <div className="flex items-center gap-2">
                    <img src="/CrimeTrack.png" alt="Logo" className="h-8 w-auto" />
                    <span className="text-white font-bold text-lg tracking-wider">MENU</span>
                </div>
                <button 
                    onClick={() => setMenuOpen(false)} 
                    className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500/20 hover:text-red-500 transition-all"
                >
                    <FaTimes size={20} />
                </button>
            </div>

            {/* User Profile / Auth Section */}
            <div className="p-6 bg-black z-50 shrink-0">
                {user ? (
                    <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5 border border-slate-700 shadow-xl">
                        <Link to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-4 mb-4">
                            <div className="relative">
                                <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-14 h-14 rounded-full object-cover border-2 border-cyan-500 shadow-lg shadow-cyan-500/20" />
                                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full"></div>
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg leading-tight">{user.name}</h3>
                                <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-wider border border-cyan-500/20">
                                    {user.role === 'senior' ? 'High Command' : user.role}
                                </span>
                            </div>
                        </Link>
                        <button 
                            onClick={() => { handleLogout(); setMenuOpen(false); }} 
                            className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-xl shadow-lg active:scale-95 transition-all"
                        >
                            <FaSignOutAlt /> Secure Logout
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4">
                        <Link 
                            to="/login" 
                            onClick={() => setMenuOpen(false)} 
                            className="py-3 text-center text-sm font-bold text-gray-300 border border-gray-600 rounded-xl hover:bg-gray-800 active:scale-95 transition-all"
                        >
                            Login
                        </Link>
                        <Link 
                            to="/signup" 
                            onClick={() => setMenuOpen(false)} 
                            className="py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-all"
                        >
                            Signup
                        </Link>
                    </div>
                )}
            </div>

            {/* Main Navigation Links */}
            <div className="flex-1 flex flex-col items-center gap-4 px-6 pb-6 bg-black overflow-y-auto">
                <MobileMenuItem to="/" icon={<FaHome />} label="Home" onClick={() => setMenuOpen(false)} />
                <MobileMenuItem to="/legalaid" icon={<FaGavel />} label="Legal Aid Services" onClick={() => setMenuOpen(false)} />
                {user && (
                    <MobileMenuItem 
                        to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : user.role === 'admin' ? "/admin" : "/police"} 
                        icon={<FaIdCard />} 
                        label="My Dashboard" 
                        highlight 
                        onClick={() => setMenuOpen(false)} 
                    />
                )}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

// --- Helper Components ---

const NavLink = ({ to, children, active }) => (
  <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
    {children}
    {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
  </Link>
);

const MobileMenuItem = ({ to, icon, label, onClick, highlight }) => (
    <Link 
        to={to} 
        onClick={onClick}
        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 group shrink-0
        ${highlight 
            ? "bg-cyan-900/20 border border-cyan-500/30 text-cyan-400" 
            : "bg-gray-900/30 border border-gray-800 hover:bg-gray-800 hover:border-gray-700 text-gray-300 hover:text-white"}`}
    >
        <span className={`text-2xl ${highlight ? "text-cyan-400" : "text-gray-500 group-hover:text-white"}`}>
            {icon}
        </span>
        <span className="text-lg font-bold tracking-wide">{label}</span>
        {highlight && <div className="ml-auto w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></div>}
    </Link>
);

export default Navbar;