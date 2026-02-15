
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { 
//   FaGavel, FaSearch, FaShieldAlt, 
//   FaFileContract, FaFileDownload, FaCommentDots, FaSync, FaExclamationCircle
// } from "react-icons/fa";

// // Import your utils
// import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../../utils/PDFGenerator"; 
// import SkeletonLoader from "../common/SkeletonLoader";

// const ViewComplaints = ({ onFileRecord }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const navigate = useNavigate(); 
//   const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

//   // --- FETCH DATA ---
//   const fetchReports = async () => {
//     if (!userInfo.token) { setLoading(false); return; }
    
//     setLoading(true);

//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/all", config);
//       setComplaints(Array.isArray(data) ? data : []);
      
//       setTimeout(() => setLoading(false), 500);

//     } catch (error) { 
//         console.error(error);
//         toast.error("Data Sync Failed"); 
//         setLoading(false); 
//     }
//   };

//   useEffect(() => { fetchReports(); }, []);

//   // --- HELPERS ---
//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   const checkAssignment = (complaint) => {
//       if (!complaint || !complaint.assignedOfficer) return false;
//       if (userInfo.role === 'senior' || userInfo.designation === 'DGP') return true;
//       const assigned = (complaint.assignedOfficer || "").toLowerCase();
//       const myName = (userInfo.name || "").toLowerCase();
//       return assigned !== "not assigned" && assigned.includes(myName);
//   };

//   const getDownloadText = (c) => c.status === "Closed" ? "Download Final Report" : (c.officialRecord?.recordNumber ? "Download FIR Copy" : "Download Receipt");

//   // --- ACTIONS ---
//   const assignToMe = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       await axios.put(`http://localhost:5000/api/crime/update/${id}`, { action: "assign_self" }, config);
//       toast.success("Case Assigned");
//       fetchReports();
//     } catch (error) { toast.error("Assignment Failed"); }
//   };

//   const handleDownload = (c) => { 
//       try {
//           if (c.status === "Closed") generateFinalReport(c);
//           else if (c.officialRecord?.recordNumber) generateOfficialRecord(c);
//           else generateReceipt(c);
//           toast.success("Document Generated");
//       } catch(err) { console.error(err); toast.error("Failed to generate PDF."); }
//   };

//   // --- RENDER ---
//   return (
//     <div className="space-y-3 md:space-y-6 pb-20 font-sans text-slate-200">
       
//        {/* Dashboard Header - Compact on Mobile */}
//        <div className="flex flex-wrap justify-between items-center bg-slate-800 p-3 md:p-5 rounded-lg border border-slate-700 shadow-lg">
//            <div>
//                <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
//                    <FaShieldAlt className="text-yellow-500" /> Station Command Center
//                </h2>
//                <p className="text-slate-400 text-[10px] md:text-xs mt-1">Officer: <span className="text-white font-medium uppercase tracking-wide bg-slate-900 px-2 py-0.5 rounded border border-slate-600 ml-1">{userInfo.name}</span></p>
//            </div>
           
//            <button 
//                 onClick={fetchReports} 
//                 className="mt-2 md:mt-0 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded text-[10px] md:text-sm font-bold transition flex items-center gap-2 border border-slate-600 shadow-md disabled:opacity-50"
//                 disabled={loading}
//            >
//                <FaSync className={loading ? "animate-spin text-yellow-500" : "text-yellow-500"} /> 
//                {loading ? "..." : "Refresh Data"}
//            </button>
//        </div>
      
//       {loading ? <SkeletonLoader count={3} /> : (
//         <div className="grid gap-2 md:gap-4">
//           {complaints && complaints.length > 0 ? complaints.map((c) => {
//             const isAssignedToMe = checkAssignment(c);
//             const isFirFiled = !!c.officialRecord?.recordNumber;
//             const isClosed = c.status === "Closed";

//             return (
//             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border-l-4 border-l-yellow-600 border-y border-r border-slate-700 p-2 md:p-5 rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300">
              
//               {/* Layout: Column on Mobile, Row on Desktop */}
//               <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                  
//                   {/* Left Info */}
//                   <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex items from overflowing */}
                      
//                       {/* Compact Tags Row */}
//                       <div className="flex flex-wrap gap-1 md:gap-3 mb-1 md:mb-2 items-center">
//                           <span className="bg-slate-900 text-slate-300 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                           <span className="bg-blue-900/20 text-blue-300 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-blue-500/20 uppercase truncate max-w-[100px] md:max-w-none">📍 {c.selectedStation}</span>
//                           <span className={`text-[9px] md:text-[10px] px-1.5 py-0.5 md:px-2 md:py-1 rounded font-bold uppercase tracking-wide border ${isClosed ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-amber-900/20 text-amber-400 border-amber-500/30'}`}>
//                               {c.status}
//                           </span>
//                       </div>

//                       {/* Title & Desc */}
//                       <h3 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 truncate">{c.crimeType}</h3>
//                       <p className="text-[10px] md:text-sm text-slate-400 mb-2 md:mb-5 line-clamp-1 md:line-clamp-2 leading-relaxed">{c.description}</p>
                      
//                       {/* Action Buttons Row */}
//                       <div className="flex flex-wrap gap-2 md:gap-3">
//                           <button onClick={() => navigate(`/case-review/${c._id}`)} className="flex-1 md:flex-none justify-center px-2 py-1.5 md:px-5 md:py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-md text-[10px] md:text-xs transition flex items-center gap-1 md:gap-2 shadow-lg">
//                               <FaFileContract /> <span className="truncate">OPEN FILE</span>
//                           </button>
                          
//                           {isAssignedToMe && !isFirFiled && !isClosed && (
//                               <button onClick={() => onFileRecord(c._id)} className="flex-1 md:flex-none justify-center px-2 py-1.5 md:px-4 md:py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-md text-[10px] md:text-xs font-bold border border-red-800/50 transition flex items-center gap-1 md:gap-2">
//                                   <FaGavel /> <span className="truncate">File FIR</span>
//                               </button>
//                           )}

//                           {!c.isAnonymous && c.user && (
//                             <button 
//                                 onClick={() => navigate(`/chat/${c.user._id}`)} 
//                                 className="flex-none justify-center px-2 py-1.5 md:px-4 md:py-2 bg-slate-700 hover:bg-slate-600 text-emerald-400 rounded-md text-[10px] md:text-xs font-bold border border-slate-600 transition flex items-center gap-1 md:gap-2"
//                             >
//                                 <FaCommentDots />
//                             </button>
//                           )}
//                       </div>
//                   </div>

//                   {/* Right Actions - Compact on Mobile */}
//                   <div className="w-full md:w-72 mt-1 md:mt-0 bg-slate-900/50 p-2 md:p-4 rounded-lg border border-slate-700/50 flex flex-col justify-center gap-2 md:gap-3">
//                       {c.assignedOfficer === "Not Assigned" ? (
//                           <div className="text-center py-1 md:py-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2">
//                               <p className="text-red-400 text-[10px] md:text-xs font-bold uppercase flex items-center gap-1 md:gap-2 animate-pulse"><FaExclamationCircle /> <span className="hidden md:inline">Action Required</span><span className="md:hidden">Action</span></p>
//                               <button onClick={() => assignToMe(c._id)} className="px-3 md:w-full py-1.5 md:py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] md:text-xs rounded shadow-lg transition transform hover:scale-105">
//                                   ACCEPT CASE
//                               </button>
//                           </div>
//                       ) : (
//                           <div className="space-y-1 md:space-y-3">
//                               <div className="flex justify-between items-center text-[10px] md:text-xs text-slate-400 border-b border-slate-700 pb-1 md:pb-2">
//                                   <span className="uppercase tracking-wider font-bold">Investigator</span>
//                                   <span className={`${isAssignedToMe ? "text-yellow-500 font-bold bg-yellow-900/10 px-1.5 py-0.5 md:px-2 rounded" : "text-slate-200"} truncate max-w-[120px]`}>{c.assignedOfficer}</span>
//                               </div>
                              
//                               <button onClick={() => handleDownload(c)} className="flex items-center justify-center gap-1 md:gap-2 w-full py-1.5 md:py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-[10px] md:text-xs font-bold uppercase rounded transition-colors">
//                                   <FaFileDownload /> {getDownloadText(c)}
//                               </button>
//                           </div>
//                       )}
//                   </div>
//               </div>
//             </motion.div>
//           )}) : <div className="text-center py-10 md:py-20 text-slate-500 text-sm md:text-lg">No active complaints found in this station.</div>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewComplaints;
















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { 
//   FaGavel, FaSearch, FaShieldAlt, 
//   FaFileContract, FaFileDownload, FaCommentDots, FaSync, FaExclamationCircle
// } from "react-icons/fa";

// // Import your utils
// import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../../utils/PDFGenerator"; 
// import SkeletonLoader from "../common/SkeletonLoader";

// const ViewComplaints = ({ onFileRecord }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
  
//   const navigate = useNavigate(); 
//   const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

//   // --- FETCH DATA ---
//   const fetchReports = async () => {
//     if (!userInfo.token) { setLoading(false); return; }
    
//     setLoading(true);

//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const { data } = await axios.get("http://localhost:5000/api/crime/all", config);
//       setComplaints(Array.isArray(data) ? data : []);
      
//       setTimeout(() => setLoading(false), 500);

//     } catch (error) { 
//         console.error(error);
//         toast.error("Data Sync Failed"); 
//         setLoading(false); 
//     }
//   };

//   useEffect(() => { fetchReports(); }, []);

//   // --- HELPERS ---
//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   // ✅ FIXED: Updated Assignment Logic to handle Designation vs Title mismatch
//   const checkAssignment = (complaint) => {
//       if (!complaint || !complaint.assignedOfficer) return false;
      
//       // 1. Senior/DGP Override (Always allow access)
//       if (userInfo.role === 'senior' || userInfo.designation === 'DGP') return true;

//       const assigned = (complaint.assignedOfficer || "").toLowerCase();
      
//       // If not assigned, return false
//       if (assigned === "not assigned") return false;

//       const myName = (userInfo.name || "").toLowerCase();

//       // 2. Direct Match Check
//       if (assigned.includes(myName)) return true;

//       // 3. Name Match ignoring Title (Fix for "Inspector Rohit" vs "Mr. Rohit")
//       // We assume userInfo.name starts with a Title (Mr. First Last)
//       const nameParts = myName.split(" ");
//       if (nameParts.length > 1) {
//           // Remove the title (first element) and rejoin: "rohit sharma"
//           const nameWithoutTitle = nameParts.slice(1).join(" ");
//           // Check if "inspector rohit sharma" includes "rohit sharma"
//           if (assigned.includes(nameWithoutTitle)) return true;
//       }

//       return false;
//   };

//   const getDownloadText = (c) => c.status === "Closed" ? "Download Final Report" : (c.officialRecord?.recordNumber ? "Download FIR Copy" : "Download Receipt");

//   // --- ACTIONS ---
//   const assignToMe = async (id) => {
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       await axios.put(`http://localhost:5000/api/crime/update/${id}`, { action: "assign_self" }, config);
//       toast.success("Case Assigned");
//       fetchReports();
//     } catch (error) { toast.error("Assignment Failed"); }
//   };

//   const handleDownload = (c) => { 
//       try {
//           if (c.status === "Closed") generateFinalReport(c);
//           else if (c.officialRecord?.recordNumber) generateOfficialRecord(c);
//           else generateReceipt(c);
//           toast.success("Document Generated");
//       } catch(err) { console.error(err); toast.error("Failed to generate PDF."); }
//   };

//   // --- RENDER ---
//   return (
//     <div className="space-y-3 md:space-y-6 pb-20 font-sans text-slate-200">
       
//        {/* Dashboard Header - Compact on Mobile */}
//        <div className="flex flex-wrap justify-between items-center bg-slate-800 p-3 md:p-5 rounded-lg border border-slate-700 shadow-lg">
//            <div>
//                <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
//                    <FaShieldAlt className="text-yellow-500" /> Station Command Center
//                </h2>
//                <p className="text-slate-400 text-[10px] md:text-xs mt-1">Officer: <span className="text-white font-medium uppercase tracking-wide bg-slate-900 px-2 py-0.5 rounded border border-slate-600 ml-1">{userInfo.name}</span></p>
//            </div>
           
//            <button 
//                 onClick={fetchReports} 
//                 className="mt-2 md:mt-0 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded text-[10px] md:text-sm font-bold transition flex items-center gap-2 border border-slate-600 shadow-md disabled:opacity-50"
//                 disabled={loading}
//            >
//                <FaSync className={loading ? "animate-spin text-yellow-500" : "text-yellow-500"} /> 
//                {loading ? "..." : "Refresh Data"}
//            </button>
//        </div>
      
//       {loading ? <SkeletonLoader count={3} /> : (
//         <div className="grid gap-2 md:gap-4">
//           {complaints && complaints.length > 0 ? complaints.map((c) => {
//             const isAssignedToMe = checkAssignment(c);
//             const isFirFiled = !!c.officialRecord?.recordNumber;
//             const isClosed = c.status === "Closed";

//             return (
//             <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border-l-4 border-l-yellow-600 border-y border-r border-slate-700 p-2 md:p-5 rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300">
              
//               {/* Layout: Column on Mobile, Row on Desktop */}
//               <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                  
//                   {/* Left Info */}
//                   <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex items from overflowing */}
                      
//                       {/* Compact Tags Row */}
//                       <div className="flex flex-wrap gap-1 md:gap-3 mb-1 md:mb-2 items-center">
//                           <span className="bg-slate-900 text-slate-300 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                           <span className="bg-blue-900/20 text-blue-300 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-blue-500/20 uppercase truncate max-w-[100px] md:max-w-none">📍 {c.selectedStation}</span>
//                           <span className={`text-[9px] md:text-[10px] px-1.5 py-0.5 md:px-2 md:py-1 rounded font-bold uppercase tracking-wide border ${isClosed ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-amber-900/20 text-amber-400 border-amber-500/30'}`}>
//                               {c.status}
//                           </span>
//                       </div>

//                       {/* Title & Desc */}
//                       <h3 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 truncate">{c.crimeType}</h3>
//                       <p className="text-[10px] md:text-sm text-slate-400 mb-2 md:mb-5 line-clamp-1 md:line-clamp-2 leading-relaxed">{c.description}</p>
                      
//                       {/* Action Buttons Row */}
//                       <div className="flex flex-wrap gap-2 md:gap-3">
//                           <button onClick={() => navigate(`/case-review/${c._id}`)} className="flex-1 md:flex-none justify-center px-2 py-1.5 md:px-5 md:py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-md text-[10px] md:text-xs transition flex items-center gap-1 md:gap-2 shadow-lg">
//                               <FaFileContract /> <span className="truncate">OPEN FILE</span>
//                           </button>
                          
//                           {/* ✅ Logic Fix: isAssignedToMe will now return TRUE for regular officers too */}
//                           {isAssignedToMe && !isFirFiled && !isClosed && (
//                               <button onClick={() => onFileRecord(c._id)} className="flex-1 md:flex-none justify-center px-2 py-1.5 md:px-4 md:py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-md text-[10px] md:text-xs font-bold border border-red-800/50 transition flex items-center gap-1 md:gap-2">
//                                   <FaGavel /> <span className="truncate">File FIR</span>
//                               </button>
//                           )}

//                           {!c.isAnonymous && c.user && (
//                             <button 
//                                 onClick={() => navigate(`/chat/${c.user._id}`)} 
//                                 className="flex-none justify-center px-2 py-1.5 md:px-4 md:py-2 bg-slate-700 hover:bg-slate-600 text-emerald-400 rounded-md text-[10px] md:text-xs font-bold border border-slate-600 transition flex items-center gap-1 md:gap-2"
//                             >
//                                 <FaCommentDots />
//                             </button>
//                           )}
//                       </div>
//                   </div>

//                   {/* Right Actions - Compact on Mobile */}
//                   <div className="w-full md:w-72 mt-1 md:mt-0 bg-slate-900/50 p-2 md:p-4 rounded-lg border border-slate-700/50 flex flex-col justify-center gap-2 md:gap-3">
//                       {c.assignedOfficer === "Not Assigned" ? (
//                           <div className="text-center py-1 md:py-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2">
//                               <p className="text-red-400 text-[10px] md:text-xs font-bold uppercase flex items-center gap-1 md:gap-2 animate-pulse"><FaExclamationCircle /> <span className="hidden md:inline">Action Required</span><span className="md:hidden">Action</span></p>
//                               <button onClick={() => assignToMe(c._id)} className="px-3 md:w-full py-1.5 md:py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] md:text-xs rounded shadow-lg transition transform hover:scale-105">
//                                   ACCEPT CASE
//                               </button>
//                           </div>
//                       ) : (
//                           <div className="space-y-1 md:space-y-3">
//                               <div className="flex justify-between items-center text-[10px] md:text-xs text-slate-400 border-b border-slate-700 pb-1 md:pb-2">
//                                   <span className="uppercase tracking-wider font-bold">Investigator</span>
//                                   <span className={`${isAssignedToMe ? "text-yellow-500 font-bold bg-yellow-900/10 px-1.5 py-0.5 md:px-2 rounded" : "text-slate-200"} truncate max-w-[120px]`}>{c.assignedOfficer}</span>
//                               </div>
                              
//                               <button onClick={() => handleDownload(c)} className="flex items-center justify-center gap-1 md:gap-2 w-full py-1.5 md:py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-[10px] md:text-xs font-bold uppercase rounded transition-colors">
//                                   <FaFileDownload /> {getDownloadText(c)}
//                               </button>
//                           </div>
//                       )}
//                   </div>
//               </div>
//             </motion.div>
//           )}) : <div className="text-center py-10 md:py-20 text-slate-500 text-sm md:text-lg">No active complaints found in this station.</div>}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewComplaints;














import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { 
  FaGavel, FaSearch, FaShieldAlt, 
  FaFileContract, FaFileDownload, FaCommentDots, FaSync, FaExclamationCircle, FaVideo 
} from "react-icons/fa"; // ✅ Added FaVideo

// Import your utils
import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../../utils/PDFGenerator"; 
import SkeletonLoader from "../common/SkeletonLoader";

const ViewComplaints = ({ onFileRecord }) => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate(); 
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // --- FETCH DATA ---
  const fetchReports = async () => {
    if (!userInfo.token) { setLoading(false); return; }
    
    setLoading(true);

    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("http://localhost:5000/api/crime/all", config);
      setComplaints(Array.isArray(data) ? data : []);
      
      setTimeout(() => setLoading(false), 500);

    } catch (error) { 
        console.error(error);
        toast.error("Data Sync Failed"); 
        setLoading(false); 
    }
  };

  useEffect(() => { fetchReports(); }, []);

  // --- HELPERS ---
  const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

  // ✅ FIXED: Updated Assignment Logic to handle Designation vs Title mismatch
  const checkAssignment = (complaint) => {
      if (!complaint || !complaint.assignedOfficer) return false;
      
      // 1. Senior/DGP Override (Always allow access)
      if (userInfo.role === 'senior' || userInfo.designation === 'DGP') return true;

      const assigned = (complaint.assignedOfficer || "").toLowerCase();
      
      // If not assigned, return false
      if (assigned === "not assigned") return false;

      const myName = (userInfo.name || "").toLowerCase();

      // 2. Direct Match Check
      if (assigned.includes(myName)) return true;

      // 3. Name Match ignoring Title (Fix for "Inspector Rohit" vs "Mr. Rohit")
      // We assume userInfo.name starts with a Title (Mr. First Last)
      const nameParts = myName.split(" ");
      if (nameParts.length > 1) {
          // Remove the title (first element) and rejoin: "rohit sharma"
          const nameWithoutTitle = nameParts.slice(1).join(" ");
          // Check if "inspector rohit sharma" includes "rohit sharma"
          if (assigned.includes(nameWithoutTitle)) return true;
      }

      return false;
  };

  const getDownloadText = (c) => c.status === "Closed" ? "Download Final Report" : (c.officialRecord?.recordNumber ? "Download FIR Copy" : "Download Receipt");

  // --- ACTIONS ---
  const assignToMe = async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      await axios.put(`http://localhost:5000/api/crime/update/${id}`, { action: "assign_self" }, config);
      toast.success("Case Assigned");
      fetchReports();
    } catch (error) { toast.error("Assignment Failed"); }
  };

  // ✅ NEW: Schedule Meeting Handler
  const handleScheduleMeeting = (c) => {
    if (c.user && c.user._id) {
        // Redirect to Citizen Meeting Page with ID, Name, and Default Title
        const title = encodeURIComponent("Investigation Meeting");
        navigate(`/police/meeting/citizen?id=${c.user._id}&name=${c.user.firstName}&title=${title}`);
    } else {
        toast.error("Citizen details not found for this complaint.");
    }
  };

  const handleDownload = (c) => { 
      try {
          if (c.status === "Closed") generateFinalReport(c);
          else if (c.officialRecord?.recordNumber) generateOfficialRecord(c);
          else generateReceipt(c);
          toast.success("Document Generated");
      } catch(err) { console.error(err); toast.error("Failed to generate PDF."); }
  };

  // --- RENDER ---
  return (
    <div className="space-y-3 md:space-y-6 pb-20 font-sans text-slate-200">
       
       {/* Dashboard Header - Compact on Mobile */}
       <div className="flex flex-wrap justify-between items-center bg-slate-800 p-3 md:p-5 rounded-lg border border-slate-700 shadow-lg">
           <div>
               <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 md:gap-3">
                   <FaShieldAlt className="text-yellow-500" /> Station Command Center
               </h2>
               <p className="text-slate-400 text-[10px] md:text-xs mt-1">Officer: <span className="text-white font-medium uppercase tracking-wide bg-slate-900 px-2 py-0.5 rounded border border-slate-600 ml-1">{userInfo.name}</span></p>
           </div>
           
           <button 
                onClick={fetchReports} 
                className="mt-2 md:mt-0 bg-slate-700 hover:bg-slate-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded text-[10px] md:text-sm font-bold transition flex items-center gap-2 border border-slate-600 shadow-md disabled:opacity-50"
                disabled={loading}
           >
               <FaSync className={loading ? "animate-spin text-yellow-500" : "text-yellow-500"} /> 
               {loading ? "..." : "Refresh Data"}
           </button>
       </div>
      
      {loading ? <SkeletonLoader count={3} /> : (
        <div className="grid gap-2 md:gap-4">
          {complaints && complaints.length > 0 ? complaints.map((c) => {
            const isAssignedToMe = checkAssignment(c);
            const isFirFiled = !!c.officialRecord?.recordNumber;
            const isClosed = c.status === "Closed";

            return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={c._id} className="bg-slate-800 border-l-4 border-l-yellow-600 border-y border-r border-slate-700 p-2 md:p-5 rounded-r-lg shadow-md hover:shadow-xl transition-all duration-300">
              
              {/* Layout: Column on Mobile, Row on Desktop */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                  
                  {/* Left Info */}
                  <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex items from overflowing */}
                      
                      {/* Compact Tags Row */}
                      <div className="flex flex-wrap gap-1 md:gap-3 mb-1 md:mb-2 items-center">
                          <span className="bg-slate-900 text-slate-300 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
                          <span className="bg-blue-900/20 text-blue-300 text-[9px] md:text-[10px] font-bold px-1.5 py-0.5 md:px-2 md:py-1 rounded border border-blue-500/20 uppercase truncate max-w-[100px] md:max-w-none">📍 {c.selectedStation}</span>
                          <span className={`text-[9px] md:text-[10px] px-1.5 py-0.5 md:px-2 md:py-1 rounded font-bold uppercase tracking-wide border ${isClosed ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-amber-900/20 text-amber-400 border-amber-500/30'}`}>
                              {c.status}
                          </span>
                      </div>

                      {/* Title & Desc */}
                      <h3 className="text-sm md:text-xl font-bold text-white mb-1 md:mb-2 truncate">{c.crimeType}</h3>
                      <p className="text-[10px] md:text-sm text-slate-400 mb-2 md:mb-5 line-clamp-1 md:line-clamp-2 leading-relaxed">{c.description}</p>
                      
                      {/* Action Buttons Row */}
                      <div className="flex flex-wrap gap-2 md:gap-3">
                          <button onClick={() => navigate(`/case-review/${c._id}`)} className="flex-1 md:flex-none justify-center px-2 py-1.5 md:px-5 md:py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded-md text-[10px] md:text-xs transition flex items-center gap-1 md:gap-2 shadow-lg">
                              <FaFileContract /> <span className="truncate">OPEN FILE</span>
                          </button>
                          
                          {/* ✅ Logic Fix: isAssignedToMe will now return TRUE for regular officers too */}
                          {isAssignedToMe && !isFirFiled && !isClosed && (
                              <button onClick={() => onFileRecord(c._id)} className="flex-1 md:flex-none justify-center px-2 py-1.5 md:px-4 md:py-2 bg-red-900/30 hover:bg-red-900/50 text-red-300 rounded-md text-[10px] md:text-xs font-bold border border-red-800/50 transition flex items-center gap-1 md:gap-2">
                                  <FaGavel /> <span className="truncate">File FIR</span>
                              </button>
                          )}

                          {!c.isAnonymous && c.user && (
                            <button 
                                onClick={() => navigate(`/chat/${c.user._id}`)} 
                                className="flex-none justify-center px-2 py-1.5 md:px-4 md:py-2 bg-slate-700 hover:bg-slate-600 text-emerald-400 rounded-md text-[10px] md:text-xs font-bold border border-slate-600 transition flex items-center gap-1 md:gap-2"
                            >
                                <FaCommentDots />
                            </button>
                          )}
                      </div>
                  </div>

                  {/* Right Actions - Compact on Mobile */}
                  <div className="w-full md:w-72 mt-1 md:mt-0 bg-slate-900/50 p-2 md:p-4 rounded-lg border border-slate-700/50 flex flex-col justify-center gap-2 md:gap-3">
                      {c.assignedOfficer === "Not Assigned" ? (
                          <div className="text-center py-1 md:py-2 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2">
                              <p className="text-red-400 text-[10px] md:text-xs font-bold uppercase flex items-center gap-1 md:gap-2 animate-pulse"><FaExclamationCircle /> <span className="hidden md:inline">Action Required</span><span className="md:hidden">Action</span></p>
                              <button onClick={() => assignToMe(c._id)} className="px-3 md:w-full py-1.5 md:py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] md:text-xs rounded shadow-lg transition transform hover:scale-105">
                                  ACCEPT CASE
                              </button>
                          </div>
                      ) : (
                          <div className="space-y-1 md:space-y-3">
                              <div className="flex justify-between items-center text-[10px] md:text-xs text-slate-400 border-b border-slate-700 pb-1 md:pb-2">
                                  <span className="uppercase tracking-wider font-bold">Investigator</span>
                                  <span className={`${isAssignedToMe ? "text-yellow-500 font-bold bg-yellow-900/10 px-1.5 py-0.5 md:px-2 rounded" : "text-slate-200"} truncate max-w-[120px]`}>{c.assignedOfficer}</span>
                              </div>
                              
                              {/* ✅ ADDED: Schedule Meeting Button (Visible if assigned) */}
                              <button 
                                onClick={() => handleScheduleMeeting(c)} 
                                className="flex items-center justify-center gap-1 md:gap-2 w-full py-1.5 md:py-2 bg-blue-600 hover:bg-blue-500 text-white text-[10px] md:text-xs font-bold uppercase rounded transition-colors shadow-lg"
                              >
                                  <FaVideo /> Schedule Meeting
                              </button>

                              <button onClick={() => handleDownload(c)} className="flex items-center justify-center gap-1 md:gap-2 w-full py-1.5 md:py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white text-[10px] md:text-xs font-bold uppercase rounded transition-colors">
                                  <FaFileDownload /> {getDownloadText(c)}
                              </button>
                          </div>
                      )}
                  </div>
              </div>
            </motion.div>
          )}) : <div className="text-center py-10 md:py-20 text-slate-500 text-sm md:text-lg">No active complaints found in this station.</div>}
        </div>
      )}
    </div>                                                              
  );
};

export default ViewComplaints;