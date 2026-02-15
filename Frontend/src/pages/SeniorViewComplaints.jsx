
// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; 
// import { 
//   FaSearch, FaFileContract, FaPhoneAlt, FaGavel, FaShieldAlt, 
//   FaExclamationCircle, FaFileDownload, FaSync, FaUser, FaCommentDots
// } from "react-icons/fa";

// // ✅ Verify these paths exist in your project
// import SkeletonLoader from "../components/common/SkeletonLoader";
// import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../utils/PDFGenerator"; 

// const SeniorViewComplaints = ({ onFileRecord }) => {
//   const [complaints, setComplaints] = useState([]);
//   const [officers, setOfficers] = useState([]); 
//   const [loading, setLoading] = useState(true);
//   const [seniorJurisdiction, setSeniorJurisdiction] = useState([]);
//   const [assignmentSelections, setAssignmentSelections] = useState({});
  
//   const navigate = useNavigate(); 
//   const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

//   // --- FETCH DATA ---
//   const fetchData = async () => {
//     setLoading(true); // ✅ Show Spinner immediately
//     try {
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//       const myStations = userInfo.station ? userInfo.station.split(", ") : [];
//       setSeniorJurisdiction(myStations);
      
//       // 1. Fetch All Complaints
//       const { data: complaintData } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
      
//       // 2. Filter based on jurisdiction (DGP sees all)
//       const filteredComplaints = complaintData.filter(complaint => 
//         userInfo.designation === 'DGP' || myStations.includes(complaint.selectedStation)
//       );
      
//       // 3. Fetch Officers for Assignment dropdown
//       const { data: officerData } = await axios.get("https://crimetrack-api.onrender.com/api/users/officers", config);
      
//       setComplaints(filteredComplaints);
//       setOfficers(officerData);
      
//       // ✅ Small delay to make the refresh action visible
//       setTimeout(() => setLoading(false), 500);

//     } catch (error) { 
//         console.error("Fetch Error:", error);
//         toast.error("Failed to refresh data"); 
//         setLoading(false); 
//     }
//   };

//   useEffect(() => { fetchData(); }, []);

//   // --- HELPERS ---
//   const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

//   const getDownloadText = (c) => {
//       if (c.status === "Closed") return "Download Closure Report";
//       if (c.officialRecord?.recordNumber) return "Download FIR Copy";
//       return "Download Receipt";
//   };

//   // --- ACTIONS ---
//   const handleAssign = async (complaintId) => {
//       const selectedValue = assignmentSelections[complaintId];
//       if(!selectedValue) return toast.error("Please select an officer first");
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         let payload = selectedValue === "SELF" ? { action: "assign_self" } : { assignedOfficer: selectedValue };
//         await axios.put(`https://crimetrack-api.onrender.com/api/crime/update/${complaintId}`, payload, config);
//         toast.success("Officer Assigned Successfully");
//         fetchData(); // Refresh list after assignment
//       } catch (error) { toast.error("Assignment Failed"); }
//   };

//   const goToFileFIR = (complaint) => { 
//       if(onFileRecord) {
//           onFileRecord(complaint._id); 
//       } else {
//           // If accessing standalone, navigate to FIR page
//           navigate('/file-fir', { state: { complaintId: complaint._id, ...complaint } }); 
//       }
//   };

//   const handleDownload = (c) => { 
//       try {
//           if (c.status === "Closed") generateFinalReport(c);
//           else if (c.officialRecord?.recordNumber) generateOfficialRecord(c);
//           else generateReceipt(c);
//           toast.success("Document Generated");
//       } catch(err) { console.error(err); toast.error("Failed to generate PDF."); }
//   };

//   return (
//     <div className="space-y-4 md:space-y-6 pb-20 font-sans text-slate-200">
       
//        {/* Header */}
//        <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-amber-900/40 to-gray-900 p-4 md:p-6 rounded-xl border border-amber-500/30 shadow-lg gap-3 md:gap-4">
//            <div>
//                <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
//                    <FaShieldAlt className="text-amber-500" /> High Command Oversight
//                </h2>
//                <p className="text-amber-400/80 text-xs mt-1">Jurisdiction: <span className="font-sans text-white">{seniorJurisdiction.join(" | ") || "ALL"}</span></p>
//            </div>
           
//            {/* ✅ Refresh Button */}
//            <button 
//                 onClick={fetchData} 
//                 className={`text-xs md:text-sm bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 md:px-5 rounded-lg font-bold transition shadow-lg flex items-center gap-2 border border-amber-500/50 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
//                 disabled={loading}
//            >
//                <FaSync className={loading ? "animate-spin" : ""} /> {loading ? "Refreshing..." : "Refresh Feed"}
//            </button>
//        </div>
      
//       {/* List */}
//       {loading ? <SkeletonLoader count={3} /> : (
//         <div className="grid gap-3 md:gap-4">
//           {complaints && complaints.length > 0 ? (
//             complaints.map((c) => {
//                 const localOfficers = officers.filter(o => o.station === c.selectedStation);
//                 const isFirFiled = !!c.officialRecord?.recordNumber;
//                 const isClosed = c.status === "Closed";

//                 return (
//                 <motion.div 
//                     initial={{ opacity: 0, y: 10 }} 
//                     animate={{ opacity: 1, y: 0 }} 
//                     key={c._id} 
//                     className="bg-slate-900 border border-slate-700 p-4 md:p-5 rounded-lg shadow-md hover:border-amber-500/50 transition-all group"
//                 >
//                   <div className="flex flex-col md:flex-row gap-4 md:gap-6">
//                       {/* Left Info */}
//                       <div className="flex-1">
//                           {/* Badge Row: Added flex-wrap for mobile responsiveness */}
//                           <div className="flex flex-wrap gap-2 md:gap-3 mb-2 items-center">
//                               <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
//                               <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
//                               <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
//                                   {c.status}
//                               </span>
//                           </div>
                          
//                           <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{c.crimeType}</h3>
//                           <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                          
//                           <div className="flex flex-wrap gap-2">
//                               {/* Case File Button */}
//                               <button 
//                                 onClick={() => navigate(`/senior/case-file/${c._id}`)} 
//                                 className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center gap-2"
//                               >
//                                   <FaFileContract /> Case File
//                               </button>

//                               {/* FIR Button */}
//                               {!isFirFiled && !isClosed && (
//                                   <button onClick={() => goToFileFIR(c)} className="px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-300 rounded text-xs font-medium border border-red-800/50 transition flex items-center gap-2">
//                                       <FaGavel /> File FIR / NCR
//                                   </button>
//                               )}

//                               {/* Contact Citizen */}
//                               {!c.isAnonymous && c.user && (
//                                   <button 
//                                       onClick={() => navigate(`/chat/${c.user._id}`)} 
//                                       className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 rounded text-xs font-medium border border-blue-500/30 transition flex items-center gap-2"
//                                   >
//                                       <FaPhoneAlt /> Contact Citizen
//                                   </button>
//                               )}
//                           </div>
//                       </div>

//                       {/* Right Actions (Assignment) - Full width on mobile, Fixed width on desktop */}
//                       <div className="w-full md:w-72 bg-slate-800/30 p-3 rounded border border-slate-700/50 flex flex-col justify-center gap-2">
//                           {c.assignedOfficer === "Not Assigned" ? (
//                               <div className="w-full">
//                                   <p className="text-red-400 text-[10px] font-bold uppercase mb-2 flex items-center justify-center gap-1"><FaExclamationCircle /> Unassigned Case</p>
//                                   <div className="flex gap-2">
//                                       <select 
//                                         className="flex-1 bg-slate-900 text-white text-[10px] border border-slate-600 rounded p-1.5 outline-none focus:border-amber-500 w-full min-w-0" 
//                                         onChange={(e) => setAssignmentSelections(prev => ({...prev, [c._id]: e.target.value}))} 
//                                         value={assignmentSelections[c._id] || ""}
//                                       >
//                                           <option value="">-- Select Officer --</option>
//                                           <option value="SELF">★ Assign Self</option>
//                                           {localOfficers.map(off => (
//                                               <option key={off._id} value={`${off.designation} ${off.firstName} ${off.lastName}`}>{off.firstName} {off.lastName}</option>
//                                           ))}
//                                       </select>
//                                       <button onClick={() => handleAssign(c._id)} className="bg-amber-600 hover:bg-amber-500 text-white px-3 rounded text-[10px] font-bold transition shrink-0">Assign</button>
//                                   </div>
//                               </div>
//                           ) : (
//                               <div className="space-y-2">
//                                   <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-700 pb-1">
//                                       <span>Investigator</span>
//                                       <span className="text-emerald-400 font-bold">{c.assignedOfficer}</span>
//                                   </div>
                                  
//                                   {/* Chat with Officer Button */}
//                                   {c.assignedOfficerId && (
//                                      <button 
//                                         onClick={() => navigate(`/chat/${c.assignedOfficerId}`)}
//                                         className="w-full text-center text-[10px] bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-700/30 py-1 rounded transition flex items-center justify-center gap-1"
//                                      >
//                                           <FaCommentDots /> Message Officer
//                                      </button>
//                                   )}
//                               </div>
//                           )}
                          
//                           <button onClick={() => handleDownload(c)} className="w-full mt-1 md:mt-2 flex items-center justify-center gap-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded text-[10px] font-bold uppercase transition-all">
//                               <FaFileDownload /> {getDownloadText(c)}
//                           </button>
//                       </div>
//                   </div>
//                 </motion.div>
//                 );
//             })
//           ) : (
//             <div className="text-center py-20 text-slate-500">No complaints found in jurisdiction.</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SeniorViewComplaints;






import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import { 
  FaSearch, FaFileContract, FaPhoneAlt, FaGavel, FaShieldAlt, 
  FaExclamationCircle, FaFileDownload, FaSync, FaUser, FaCommentDots, FaVideo
} from "react-icons/fa"; // ✅ Added FaVideo

// ✅ Verify these paths exist in your project
import SkeletonLoader from "../components/common/SkeletonLoader";
import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../utils/PDFGenerator"; 

const SeniorViewComplaints = ({ onFileRecord }) => {
  const [complaints, setComplaints] = useState([]);
  const [officers, setOfficers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [seniorJurisdiction, setSeniorJurisdiction] = useState([]);
  const [assignmentSelections, setAssignmentSelections] = useState({});
  
  const navigate = useNavigate(); 
  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};

  // --- FETCH DATA ---
  const fetchData = async () => {
    setLoading(true); // ✅ Show Spinner immediately
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const myStations = userInfo.station ? userInfo.station.split(", ") : [];
      setSeniorJurisdiction(myStations);
      
      // 1. Fetch All Complaints
      const { data: complaintData } = await axios.get("https://crimetrack-api.onrender.com/api/crime/all", config);
      
      // 2. Filter based on jurisdiction (DGP sees all)
      const filteredComplaints = complaintData.filter(complaint => 
        userInfo.designation === 'DGP' || myStations.includes(complaint.selectedStation)
      );
      
      // 3. Fetch Officers for Assignment dropdown
      const { data: officerData } = await axios.get("https://crimetrack-api.onrender.com/api/users/officers", config);
      
      setComplaints(filteredComplaints);
      setOfficers(officerData);
      
      // ✅ Small delay to make the refresh action visible
      setTimeout(() => setLoading(false), 500);

    } catch (error) { 
        console.error("Fetch Error:", error);
        toast.error("Failed to refresh data"); 
        setLoading(false); 
    }
  };

  useEffect(() => { fetchData(); }, []);

  // --- HELPERS ---
  const safeIdSlice = (id) => id && typeof id === 'string' ? id.slice(-6).toUpperCase() : "UNKNOWN";

  const getDownloadText = (c) => {
      if (c.status === "Closed") return "Download Closure Report";
      if (c.officialRecord?.recordNumber) return "Download FIR Copy";
      return "Download Receipt";
  };

  // --- ACTIONS ---
  const handleAssign = async (complaintId) => {
      const selectedValue = assignmentSelections[complaintId];
      if(!selectedValue) return toast.error("Please select an officer first");
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        let payload = selectedValue === "SELF" ? { action: "assign_self" } : { assignedOfficer: selectedValue };
        await axios.put(`https://crimetrack-api.onrender.com/api/crime/update/${complaintId}`, payload, config);
        toast.success("Officer Assigned Successfully");
        fetchData(); // Refresh list after assignment
      } catch (error) { toast.error("Assignment Failed"); }
  };

  // ✅ NEW: Schedule Meeting Handler (Senior)
  const handleScheduleMeeting = (c) => {
    if (c.user && c.user._id) {
        // Redirect to Senior's Citizen Meeting Route
        const title = encodeURIComponent("Investigation Meeting");
        navigate(`/senior/meeting/citizen?id=${c.user._id}&name=${c.user.firstName}&title=${title}`);
    } else {
        toast.error("Citizen details not found for this complaint.");
    }
  };

  const goToFileFIR = (complaint) => { 
      if(onFileRecord) {
          onFileRecord(complaint._id); 
      } else {
          // If accessing standalone, navigate to FIR page
          navigate('/file-fir', { state: { complaintId: complaint._id, ...complaint } }); 
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

  return (
    <div className="space-y-4 md:space-y-6 pb-20 font-sans text-slate-200">
       
       {/* Header */}
       <div className="flex flex-wrap justify-between items-center bg-gradient-to-r from-amber-900/40 to-gray-900 p-4 md:p-6 rounded-xl border border-amber-500/30 shadow-lg gap-3 md:gap-4">
           <div>
               <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                   <FaShieldAlt className="text-amber-500" /> High Command Oversight
               </h2>
               <p className="text-amber-400/80 text-xs mt-1">Jurisdiction: <span className="font-sans text-white">{seniorJurisdiction.join(" | ") || "ALL"}</span></p>
           </div>
           
           {/* ✅ Refresh Button */}
           <button 
                onClick={fetchData} 
                className={`text-xs md:text-sm bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 md:px-5 rounded-lg font-bold transition shadow-lg flex items-center gap-2 border border-amber-500/50 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
                disabled={loading}
           >
               <FaSync className={loading ? "animate-spin" : ""} /> {loading ? "Refreshing..." : "Refresh Feed"}
           </button>
       </div>
      
      {/* List */}
      {loading ? <SkeletonLoader count={3} /> : (
        <div className="grid gap-3 md:gap-4">
          {complaints && complaints.length > 0 ? (
            complaints.map((c) => {
                const localOfficers = officers.filter(o => o.station === c.selectedStation);
                const isFirFiled = !!c.officialRecord?.recordNumber;
                const isClosed = c.status === "Closed";

                return (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    key={c._id} 
                    className="bg-slate-900 border border-slate-700 p-4 md:p-5 rounded-lg shadow-md hover:border-amber-500/50 transition-all group"
                >
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                      {/* Left Info */}
                      <div className="flex-1">
                          {/* Badge Row */}
                          <div className="flex flex-wrap gap-2 md:gap-3 mb-2 items-center">
                              <span className="bg-slate-800 text-slate-300 text-[10px] px-2 py-1 rounded border border-slate-600 font-mono">#{safeIdSlice(c._id)}</span>
                              <span className="bg-blue-900/20 text-blue-300 text-[10px] px-2 py-1 rounded border border-blue-500/20">📍 {c.selectedStation}</span>
                              <span className={`text-[10px] px-2 py-1 rounded font-bold uppercase ${isClosed ? 'bg-green-900/30 text-green-400 border border-green-500/30' : 'bg-amber-900/30 text-amber-400 border border-amber-500/30'}`}>
                                  {c.status}
                              </span>
                          </div>
                          
                          <h3 className="text-base md:text-lg font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{c.crimeType}</h3>
                          <p className="text-xs text-slate-400 mb-4 line-clamp-2">{c.description}</p>
                          
                          <div className="flex flex-wrap gap-2">
                              {/* Case File Button */}
                              <button 
                                onClick={() => navigate(`/senior/case-file/${c._id}`)} 
                                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded text-xs text-white font-medium border border-slate-600 transition flex items-center gap-2"
                              >
                                  <FaFileContract /> Case File
                              </button>

                              {/* FIR Button */}
                              {!isFirFiled && !isClosed && (
                                  <button onClick={() => goToFileFIR(c)} className="px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 text-red-300 rounded text-xs font-medium border border-red-800/50 transition flex items-center gap-2">
                                      <FaGavel /> File FIR / NCR
                                  </button>
                              )}

                              {/* Contact Citizen */}
                              {!c.isAnonymous && c.user && (
                                  <button 
                                      onClick={() => navigate(`/chat/${c.user._id}`)} 
                                      className="px-3 py-1.5 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 rounded text-xs font-medium border border-blue-500/30 transition flex items-center gap-2"
                                  >
                                      <FaPhoneAlt /> Contact Citizen
                                  </button>
                              )}
                          </div>
                      </div>

                      {/* Right Actions (Assignment) */}
                      <div className="w-full md:w-72 bg-slate-800/30 p-3 rounded border border-slate-700/50 flex flex-col justify-center gap-2">
                          {c.assignedOfficer === "Not Assigned" ? (
                              <div className="w-full">
                                  <p className="text-red-400 text-[10px] font-bold uppercase mb-2 flex items-center justify-center gap-1"><FaExclamationCircle /> Unassigned Case</p>
                                  <div className="flex gap-2">
                                      <select 
                                        className="flex-1 bg-slate-900 text-white text-[10px] border border-slate-600 rounded p-1.5 outline-none focus:border-amber-500 w-full min-w-0" 
                                        onChange={(e) => setAssignmentSelections(prev => ({...prev, [c._id]: e.target.value}))} 
                                        value={assignmentSelections[c._id] || ""}
                                      >
                                          <option value="">-- Select Officer --</option>
                                          <option value="SELF">★ Assign Self</option>
                                          {localOfficers.map(off => (
                                              <option key={off._id} value={`${off.designation} ${off.firstName} ${off.lastName}`}>{off.firstName} {off.lastName}</option>
                                          ))}
                                      </select>
                                      <button onClick={() => handleAssign(c._id)} className="bg-amber-600 hover:bg-amber-500 text-white px-3 rounded text-[10px] font-bold transition shrink-0">Assign</button>
                                  </div>
                              </div>
                          ) : (
                              <div className="space-y-2">
                                  <div className="flex justify-between items-center text-[10px] text-slate-400 border-b border-slate-700 pb-1">
                                      <span>Investigator</span>
                                      <span className="text-emerald-400 font-bold">{c.assignedOfficer}</span>
                                  </div>
                                  
                                  {/* Chat with Officer Button */}
                                  {c.assignedOfficerId && (
                                     <button 
                                        onClick={() => navigate(`/chat/${c.assignedOfficerId}`)}
                                        className="w-full text-center text-[10px] bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-400 border border-emerald-700/30 py-1 rounded transition flex items-center justify-center gap-1"
                                     >
                                           <FaCommentDots /> Message Officer
                                     </button>
                                  )}

                                  {/* ✅ ADDED: Schedule Meeting Button (Visible if assigned) */}
                                  <button 
                                    onClick={() => handleScheduleMeeting(c)}
                                    className="w-full flex items-center justify-center gap-2 py-1.5 bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 rounded text-[10px] font-bold uppercase transition-all shadow"
                                  >
                                      <FaVideo /> Schedule Meeting
                                  </button>
                                  
                                  <button onClick={() => handleDownload(c)} className="w-full flex items-center justify-center gap-2 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-600 rounded text-[10px] font-bold uppercase transition-all">
                                      <FaFileDownload /> {getDownloadText(c)}
                                  </button>
                              </div>
                          )}
                      </div>
                  </div>
                </motion.div>
                );
            })
          ) : (
            <div className="text-center py-20 text-slate-500">No complaints found in jurisdiction.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SeniorViewComplaints;