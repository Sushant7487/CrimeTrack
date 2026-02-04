
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "react-hot-toast"; 
import { FaSignOutAlt, FaTimes, FaUserCircle, FaCheckCircle, FaBars } from "react-icons/fa"; 

// --- 🔔 CENTRALIZED NOTIFICATION SYSTEM ---
const playNotificationSound = () => {
  const audio = new Audio('/notification.mp3');
  audio.play().catch(err => console.log("Sound play blocked:", err));
};

const triggerNotification = (type, title, message) => {
  playNotificationSound();
  const toastId = `nav-toast-${Date.now()}`;
  
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
      <button onClick={() => toast.dismiss(t.id)} className="text-slate-500 hover:text-white transition-colors p-1.5 rounded-md hover:bg-slate-800">
        <FaTimes size={14} />
      </button>
    </motion.div>
  ), { duration: 3500, position: 'top-center', id: toastId }); 
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

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

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    triggerNotification('error', 'Logged Out', 'Securely signed out from CrimeTrack.');
    setTimeout(() => { navigate("/"); }, 1000);
  };

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === "/";
  const showLogo = !isHome || (isHome && scrolled);

  return (
    <>
    <Toaster containerStyle={{ top: 20, zIndex: 999999 }} />

    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/60 backdrop-blur-xl border-b border-gray-800/50 shadow-lg" : "bg-transparent border-b border-transparent"}`}>
      
      <div className="max-w-7xl mx-auto px-4 py-2 md:px-6 md:pt-3 md:pb-2 flex justify-between items-center h-16 md:h-20">
        
        {/* LOGO AREA */}
        <Link to="/" className="flex items-center gap-3 group relative z-50">
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

        {/* --- DESKTOP MENU (Hidden on Mobile) --- */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={isActive("/")}>Home</NavLink>
          <NavLink to="/legalaid" active={isActive("/legalaid")}>Legal Aid</NavLink>
          {user ? (
            <div className="flex items-center gap-6">
              <NavLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} active={isActive("/user") || isActive("/police") || isActive("/senior")}>Dashboard</NavLink>
              <div className="flex items-center gap-4 border-l border-gray-600/50 pl-6">
                <div className="text-right">
                  <p className="text-sm font-bold text-white leading-tight">{user.name}</p>
                  <p className="text-[10px] text-cyan-300 uppercase tracking-wider font-semibold">{user.role === 'senior' ? 'High Command' : user.role}</p>
                </div>
                <div className="relative">
                    {user.idPhoto ? <img src={user.idPhoto} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-cyan-500/30 shadow-md" /> : <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center border-2 border-gray-600"><FaUserCircle className="text-2xl text-gray-400" /></div>}
                </div>
                <button onClick={handleLogout} className="px-5 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500 hover:text-white transition-all text-xs font-semibold shadow-sm">Logout</button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 hover:text-white font-medium transition hover:drop-shadow-md">Login</Link>
              <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-full font-bold text-xs shadow-lg border border-white/10">Signup</Link>
            </div>
          )}
        </div>

        {/* --- MOBILE TOGGLE (Visible on Mobile) --- */}
        <div className="flex items-center gap-2 md:hidden">
            {/* User Avatar Tiny (Visible outside menu) */}
            {user && (
                <Link to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} className="relative">
                    <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-8 h-8 rounded-full object-cover border border-cyan-500/50" />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full"></div>
                </Link>
            )}
            
            {/* Hamburger Button */}
            <button 
                onClick={() => setMenuOpen(true)} 
                className="text-white p-2 rounded-lg bg-white/5 border border-white/10 active:scale-95 transition-transform"
            >
                <FaBars size={20} />
            </button>
        </div>
      </div>

      {/* --- MOBILE SIDE DRAWER (Sliding Menu) --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* 1. Backdrop (Click to close) */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden"
            />

            {/* 2. Side Drawer */}
            <motion.div 
                initial={{ x: "100%" }} 
                animate={{ x: 0 }} 
                exit={{ x: "100%" }} 
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[75%] max-w-[300px] bg-[#0F172A] border-l border-gray-800 shadow-2xl z-[70] md:hidden flex flex-col"
            >
                
                {/* Drawer Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-800/50">
                    <h2 className="text-lg font-bold text-white tracking-wide">Menu</h2>
                    <button onClick={() => setMenuOpen(false)} className="text-gray-400 hover:text-white p-1">
                        <FaTimes size={20} />
                    </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-5 space-y-6">
                    
                    {/* User Info (Inside Menu) */}
                    {user && (
                        <div className="bg-gray-800/50 rounded-xl p-4 flex items-center gap-3 border border-gray-700">
                             <img src={user.idPhoto || "/default-avatar.png"} alt="User" className="w-10 h-10 rounded-full object-cover" />
                             <div>
                                <p className="text-sm font-bold text-white">{user.name}</p>
                                <p className="text-xs text-cyan-400 uppercase">{user.role}</p>
                             </div>
                        </div>
                    )}

                    {/* Navigation Links */}
                    <div className="flex flex-col space-y-2">
                        <MobileLink to="/" onClick={() => setMenuOpen(false)}>Home</MobileLink>
                        <MobileLink to="/legalaid" onClick={() => setMenuOpen(false)}>Legal Aid</MobileLink>
                        {user && (
                            <MobileLink to={user.role === 'citizen' ? "/user" : user.role === 'senior' ? "/senior" : "/police"} onClick={() => setMenuOpen(false)}>
                                <span className="text-cyan-400">My Dashboard</span>
                            </MobileLink>
                        )}
                    </div>

                    {/* Footer Actions (Small Buttons) */}
                    <div className="pt-4 border-t border-gray-800/50">
                        {user ? (
                            <button 
                                onClick={() => { handleLogout(); setMenuOpen(false); }} 
                                className="w-full py-2.5 flex items-center justify-center gap-2 text-xs font-bold text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg active:scale-95 transition-all"
                            >
                                <FaSignOutAlt /> Logout
                            </button>
                        ) : (
                            <div className="grid grid-cols-2 gap-3">
                                <Link 
                                    to="/login" 
                                    onClick={() => setMenuOpen(false)} 
                                    className="py-2 text-center text-xs font-bold text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 active:scale-95 transition-all"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    onClick={() => setMenuOpen(false)} 
                                    className="py-2 text-center text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg shadow-lg active:scale-95 transition-all"
                                >
                                    Signup
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
    </>
  );
};

// Helper Components
const NavLink = ({ to, children, active }) => (
  <Link to={to} className={`relative px-2 py-1 transition-colors duration-300 font-medium tracking-wide ${active ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]" : "text-gray-300 hover:text-white"}`}>
    {children}
    {active && <motion.div layoutId="underline" className="absolute left-0 right-0 -bottom-1 h-0.5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />}
  </Link>
);

const MobileLink = ({ to, onClick, children }) => (
  <Link 
    to={to} 
    onClick={onClick} 
    className="block w-full py-3 px-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors border-b border-gray-800/50 last:border-0"
  >
    {children}
  </Link>
);

export default Navbar;