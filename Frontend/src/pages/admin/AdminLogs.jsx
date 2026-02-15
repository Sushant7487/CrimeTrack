import React, { useState, useEffect } from "react";
import { FaUser, FaClock, FaSearch, FaHistory, FaArrowLeft, FaCircle } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "../../config"; // Adjust path if needed

const AdminLogs = ({ onBack }) => {
  const [view, setView] = useState("menu"); // 'menu', 'time', 'user'
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userLogs, setUserLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  // --- API CALLS ---
  const fetchAllLogs = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(`${BASE_URL}/api/logs/all`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setLogs(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(`${BASE_URL}/api/logs/users`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setUsers(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fetchUserLogs = async (userId) => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const { data } = await axios.get(`${BASE_URL}/api/logs/user/${userId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` }
      });
      setUserLogs(data);
    } catch (err) { console.error(err); }
  };

  // --- RENDER HELPERS ---
  const formatDate = (isoString) => {
    const d = new Date(isoString);
    return `${d.toLocaleDateString()} at ${d.toLocaleTimeString()}`;
  };

  const getActionColor = (action) => {
    if (action.includes("Login")) return "text-green-400";
    if (action.includes("SOS")) return "text-red-500 font-bold";
    if (action.includes("FIR") || action.includes("Complaint")) return "text-amber-400";
    return "text-blue-300";
  };

  // --- VIEWS ---

  // 1. MENU SELECTION VIEW
  if (view === "menu") {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-8 fade-in">
        <h2 className="text-2xl font-bold text-slate-300 uppercase tracking-widest">Select Log View</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Logs By Time Card */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => { setView("time"); fetchAllLogs(); }}
            className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 cursor-pointer hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/20 transition-all group text-center"
          >
            <FaClock className="text-6xl text-blue-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-2">Logs by Time</h3>
            <p className="text-slate-400">Chronological feed of all system activities.</p>
          </motion.div>

          {/* Logs By User Card */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            onClick={() => { setView("user"); fetchUsers(); }}
            className="bg-slate-800/50 p-10 rounded-3xl border border-slate-700 cursor-pointer hover:border-purple-500 hover:shadow-2xl hover:shadow-purple-900/20 transition-all group text-center"
          >
            <FaUser className="text-6xl text-purple-500 mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-2xl font-bold text-white mb-2">Logs by User</h3>
            <p className="text-slate-400">Detailed history filtered by specific users.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // 2. LOGS BY TIME VIEW
  if (view === "time") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700">
          <button onClick={() => setView("menu")} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white"><FaArrowLeft /></button>
          <h2 className="text-xl font-bold text-blue-400 flex items-center gap-2"><FaClock /> System Chronological Logs</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? <p className="text-center text-slate-500 mt-10">Loading logs...</p> : (
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log._id} className="flex items-start gap-4 p-4 bg-slate-800/30 rounded-xl border border-slate-700 hover:bg-slate-800/50 transition-colors">
                  <div className="text-xs font-mono text-slate-500 whitespace-nowrap pt-1 w-32">{formatDate(log.timestamp)}</div>
                  <div className="flex-1">
                    <p className={`text-sm font-bold ${getActionColor(log.action)}`}>{log.action}</p>
                    <p className="text-xs text-slate-300">{log.details}</p>
                  </div>
                  {log.user && (
                    <div className="flex items-center gap-2 bg-slate-900 px-3 py-1 rounded-full border border-slate-700">
                      <img src={log.user.idPhoto} alt="u" className="w-5 h-5 rounded-full object-cover" />
                      <span className="text-xs text-slate-400 truncate max-w-[100px]">{log.user.firstName}</span>
                    </div>
                  )}
                </div>
              ))}
              {logs.length === 0 && <p className="text-center text-slate-500 py-10">No activity recorded yet.</p>}
            </div>
          )}
        </div>
      </div>
    );
  }

  // 3. LOGS BY USER VIEW
  if (view === "user") {
    return (
      <div className="h-full flex flex-col">
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-slate-700">
          <button onClick={() => setView("menu")} className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 text-white"><FaArrowLeft /></button>
          <h2 className="text-xl font-bold text-purple-400 flex items-center gap-2"><FaUser /> User Activity Audit</h2>
        </div>

        <div className="flex-1 flex flex-col md:flex-row gap-6 overflow-hidden">
          
          {/* LEFT: User List */}
          <div className="w-full md:w-1/3 bg-slate-800/30 rounded-2xl border border-slate-700 flex flex-col">
            <div className="p-4 border-b border-slate-700">
              <div className="relative">
                <FaSearch className="absolute left-3 top-3 text-slate-500" />
                <input 
                  placeholder="Search user..." 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2 pl-9 pr-4 text-sm text-white focus:border-purple-500 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
              {users.filter(u => u.firstName.toLowerCase().includes(searchTerm.toLowerCase())).map(user => (
                <div 
                  key={user._id} 
                  onClick={() => { setSelectedUser(user); fetchUserLogs(user._id); }}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${selectedUser?._id === user._id ? "bg-purple-600/20 border border-purple-500/50" : "hover:bg-slate-800 border border-transparent"}`}
                >
                  <div className="relative">
                    <img src={user.idPhoto} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-600" />
                    {user.isOnline && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border border-slate-900"></div>}
                  </div>
                  <div className="overflow-hidden">
                    <h4 className="text-sm font-bold text-white truncate">{user.title} {user.firstName} {user.lastName}</h4>
                    <span className="text-[10px] uppercase tracking-wider bg-slate-900 px-2 py-0.5 rounded text-slate-400 border border-slate-700">{user.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Selected User Logs */}
          <div className="w-full md:w-2/3 bg-slate-800/30 rounded-2xl border border-slate-700 p-6 flex flex-col relative overflow-hidden">
            {selectedUser ? (
              <>
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700/50">
                  <img src={selectedUser.idPhoto} className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-lg object-cover" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedUser.title} {selectedUser.firstName} {selectedUser.lastName}</h3>
                    <p className="text-sm text-slate-400 capitalize">{selectedUser.role} Account • ID: {selectedUser._id.slice(-6)}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                  {userLogs.length > 0 ? (
                    <div className="space-y-6 relative border-l-2 border-slate-700 ml-3 pl-6 py-2">
                      {userLogs.map((log) => (
                        <div key={log._id} className="relative">
                          <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-900 border-2 border-purple-500"></div>
                          <div className="bg-slate-900/50 border border-slate-700 p-3 rounded-lg hover:border-purple-500/30 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                              <span className={`text-sm font-bold ${getActionColor(log.action)}`}>{log.action}</span>
                              <span className="text-[10px] font-mono text-slate-500">{formatDate(log.timestamp)}</span>
                            </div>
                            <p className="text-xs text-slate-300">{log.details}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500">
                      <FaHistory className="text-4xl mb-3 opacity-30" />
                      <p>No activity logs found for this user.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500">
                <FaUser className="text-6xl mb-4 opacity-20" />
                <h3 className="text-lg font-bold">Select a User</h3>
                <p>Click on a user from the left list to view their full history.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    );
  }
};

export default AdminLogs;