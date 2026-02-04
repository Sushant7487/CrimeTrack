

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import { 
  FaHistory, FaSearch, FaFileDownload, FaFilter, FaCalendarAlt, 
  FaMapMarkerAlt, FaUserSecret, FaTimesCircle, FaFileContract,
  FaGavel, FaFolderOpen, FaUserTie, FaBuilding, FaFilePdf
} from "react-icons/fa";

// ✅ PDF Generators
import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../../utils/PDFGenerator"; 
import SkeletonLoader from "../common/SkeletonLoader";

const PastCrimes = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState(""); // General Search
  const [searchOfficer, setSearchOfficer] = useState(""); // Officer Name
  const [selectedStation, setSelectedStation] = useState(""); // Station Dropdown
  const [stationsList, setStationsList] = useState([]); // Unique stations list
  
  const [selectedRecord, setSelectedRecord] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // --- 1. Fetch History ---
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        // Fetching ALL history
        const { data } = await axios.get("https://crimetrack-api.onrender.com/api/crime/history", config);
        
        // 1. Filter ONLY "Closed" cases immediately (as per requirement)
        const closedCases = Array.isArray(data) ? data.filter(r => r.status === "Closed") : [];
        setRecords(closedCases);

        // 2. Extract Unique Stations for Dropdown
        const uniqueStations = [...new Set(closedCases.map(item => item.selectedStation).filter(Boolean))];
        setStationsList(uniqueStations);

        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load criminal archives");
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  // --- 2. Advanced Filtering Logic ---
  const filteredRecords = records.filter(rec => {
      // A. General Search (ID, Crime Type, Victim)
      const matchesGeneral = 
        (rec.victimName?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (rec._id?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (rec.crimeType?.toLowerCase().includes(searchQuery.toLowerCase()));

      // B. Station Filter
      const matchesStation = selectedStation ? rec.selectedStation === selectedStation : true;

      // C. Officer Filter
      const matchesOfficer = searchOfficer ? rec.assignedOfficer?.toLowerCase().includes(searchOfficer.toLowerCase()) : true;

      return matchesGeneral && matchesStation && matchesOfficer;
  });

  // --- 3. Format Date Helper ---
  const formatDate = (date) => new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

  return (
    // Responsive: space-y-4 for mobile, space-y-6 for desktop
    <div className="space-y-4 md:space-y-6 pb-20 font-sans text-slate-200 min-h-screen">
        
        {/* === HEADER & FILTERS === */}
        {/* Responsive: p-4 for mobile, p-5 for desktop */}
        <div className="bg-slate-800 p-4 md:p-5 rounded-2xl border border-slate-700 shadow-xl">
            <div className="mb-4">
                {/* Responsive: text-xl for mobile, text-2xl for desktop */}
                <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                    <FaHistory className="text-emerald-500"/> Closed Case Archives
                </h2>
                <p className="text-xs text-slate-400 mt-1">Repository of all solved and closed criminal cases across jurisdiction.</p>
            </div>
            
            {/* Filter Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* 1. General Search */}
                <div className="relative group">
                    <FaSearch className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-emerald-500 transition-colors"/>
                    <input 
                        type="text" 
                        placeholder="Search Case ID or Crime..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        // Responsive: py-2.5 for mobile, py-3 for desktop
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-4 py-2.5 md:py-3 text-sm text-white focus:border-emerald-500 outline-none transition-all shadow-inner"
                    />
                </div>

                {/* 2. Station Filter */}
                <div className="relative group">
                    <FaBuilding className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-blue-500 transition-colors"/>
                    <select 
                        value={selectedStation} 
                        onChange={(e) => setSelectedStation(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-4 py-2.5 md:py-3 text-sm text-white focus:border-blue-500 outline-none transition-all shadow-inner appearance-none"
                    >
                        <option value="">All Police Stations</option>
                        {stationsList.map((st, i) => <option key={i} value={st}>{st}</option>)}
                    </select>
                </div>

                {/* 3. Officer Filter */}
                <div className="relative group">
                    <FaUserTie className="absolute left-3 top-3.5 text-slate-500 group-focus-within:text-purple-500 transition-colors"/>
                    <input 
                        type="text" 
                        placeholder="Filter by Investigating Officer..." 
                        value={searchOfficer}
                        onChange={(e) => setSearchOfficer(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-600 rounded-xl pl-10 pr-4 py-2.5 md:py-3 text-sm text-white focus:border-purple-500 outline-none transition-all shadow-inner"
                    />
                </div>
            </div>
        </div>

        {/* === RESULTS GRID === */}
        {loading ? <SkeletonLoader count={6} type="card"/> : (
            // Responsive: gap-4 for mobile, gap-5 for desktop
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filteredRecords.length > 0 ? filteredRecords.map((rec) => (
                    <motion.div 
                        key={rec._id} 
                        layoutId={rec._id}
                        onClick={() => setSelectedRecord(rec)}
                        whileHover={{ y: -5 }}
                        // Responsive: p-4 for mobile, p-5 for desktop
                        className="bg-slate-800 border border-slate-700 p-4 md:p-5 rounded-xl shadow-lg cursor-pointer hover:shadow-emerald-500/10 hover:border-emerald-500/50 transition-all group relative overflow-hidden"
                    >
                        {/* Status Badge */}
                        <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                            CLOSED
                        </div>

                        <div className="flex items-start justify-between mb-3">
                            <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-emerald-500 text-xl">
                                <FaFolderOpen />
                            </div>
                            <div className="text-right mt-4 mr-2">
                                <p className="text-[10px] text-slate-500 uppercase font-bold">Case ID</p>
                                <p className="text-xs font-mono text-white">#{rec._id.slice(-6).toUpperCase()}</p>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                            {rec.crimeType}
                        </h3>
                        <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
                            <FaMapMarkerAlt /> {rec.selectedStation}
                        </p>

                        <div className="border-t border-slate-700 pt-3 flex flex-col gap-2">
                            <div className="flex justify-between text-xs text-slate-300">
                                <span className="text-slate-500">Suspect:</span> 
                                <span className="font-semibold">{rec.suspectName || "Unknown"}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-300">
                                <span className="text-slate-500">Officer:</span> 
                                <span className="font-semibold text-blue-400">{rec.assignedOfficer}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-300">
                                <span className="text-slate-500">Closed Date:</span> 
                                <span className="font-mono">{formatDate(rec.updatedAt)}</span>
                            </div>
                        </div>
                    </motion.div>
                )) : (
                    <div className="col-span-full text-center py-20 bg-slate-800/50 rounded-2xl border border-dashed border-slate-700">
                        <FaFolderOpen className="mx-auto text-4xl text-slate-600 mb-3"/>
                        <p className="text-slate-400">No closed case records found matching your filters.</p>
                    </div>
                )}
            </div>
        )}

        {/* === CASE FILE MODAL === */}
        <AnimatePresence>
            {selectedRecord && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[9999] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} 
                        animate={{ scale: 1, opacity: 1 }} 
                        exit={{ scale: 0.9, opacity: 0 }}
                        // Responsive: max-h-[85vh] for mobile, 90vh desktop
                        className="bg-slate-900 w-full max-w-4xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col max-h-[85vh] md:max-h-[90vh] overflow-hidden"
                    >
                        
                        {/* Header: Responsive padding */}
                        <div className="bg-slate-800 px-4 py-3 md:px-6 md:py-4 border-b border-slate-700 flex justify-between items-center">
                            <div>
                                <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                                    <FaFileContract className="text-emerald-500"/> Case File: #{selectedRecord._id.slice(-6).toUpperCase()}
                                </h2>
                                <p className="text-xs text-slate-400">Status: <span className="text-emerald-400 font-bold">CLOSED</span></p>
                            </div>
                            <button onClick={() => setSelectedRecord(null)} className="text-slate-400 hover:text-white bg-slate-700 p-2 rounded-full hover:bg-red-500/20 hover:text-red-400 transition-all">
                                <FaTimesCircle size={20}/>
                            </button>
                        </div>

                        {/* Body: Responsive padding and spacing */}
                        <div className="p-4 md:p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4 md:space-y-6">
                            
                            {/* 1. Case Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="bg-black/30 border border-slate-700 p-4 rounded-xl">
                                    <h3 className="text-blue-400 text-xs font-bold uppercase mb-4 flex items-center gap-2"><FaGavel/> Incident Info</h3>
                                    <div className="space-y-3 text-sm">
                                        <p className="flex justify-between"><span className="text-slate-500">Crime Type:</span> <span className="text-white">{selectedRecord.crimeType}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Date Reported:</span> <span className="text-white">{formatDate(selectedRecord.createdAt)}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Location:</span> <span className="text-white">{selectedRecord.location || "N/A"}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Station:</span> <span className="text-white">{selectedRecord.selectedStation}</span></p>
                                    </div>
                                </div>

                                <div className="bg-black/30 border border-slate-700 p-4 rounded-xl">
                                    <h3 className="text-red-400 text-xs font-bold uppercase mb-4 flex items-center gap-2"><FaUserSecret/> Suspect Info</h3>
                                    <div className="space-y-3 text-sm">
                                        <p className="flex justify-between"><span className="text-slate-500">Name:</span> <span className="text-white">{selectedRecord.suspectName || "Unknown"}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Address:</span> <span className="text-white text-right max-w-[200px] truncate">{selectedRecord.suspectAddress || "N/A"}</span></p>
                                        <p className="flex justify-between"><span className="text-slate-500">Contact:</span> <span className="text-white">{selectedRecord.suspectContact || "N/A"}</span></p>
                                    </div>
                                </div>
                            </div>

                            {/* 2. Full Description */}
                            <div className="bg-slate-800/50 p-4 md:p-5 rounded-xl border border-slate-700">
                                <h3 className="text-slate-400 text-xs font-bold uppercase mb-2">Official Investigation Description</h3>
                                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">{selectedRecord.description}</p>
                            </div>

                            {/* 3. DOWNLOADS SECTION (Requested Feature) */}
                            <div className="bg-slate-800 border border-emerald-500/30 p-4 md:p-5 rounded-xl">
                                <h3 className="text-emerald-400 text-sm font-bold uppercase mb-4 flex items-center gap-2">
                                    <FaFileDownload /> Digital Records & Downloads
                                </h3>
                                {/* Responsive: grid-cols-1 for mobile (stacks buttons), grid-cols-3 for desktop */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                                    {/* Button 1: Receipt */}
                                    <button 
                                        onClick={() => { generateReceipt(selectedRecord); toast.success("Downloading Receipt..."); }}
                                        className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg text-white text-xs font-bold transition-all hover:scale-[1.02]"
                                    >
                                        <FaFilePdf className="text-red-400 text-lg"/> Complaint Receipt
                                    </button>

                                    {/* Button 2: FIR/NCR */}
                                    {selectedRecord.officialRecord?.recordNumber ? (
                                        <button 
                                            onClick={() => { generateOfficialRecord(selectedRecord); toast.success("Downloading Official Record..."); }}
                                            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-900/40 hover:bg-blue-900/60 border border-blue-500/30 rounded-lg text-blue-100 text-xs font-bold transition-all hover:scale-[1.02]"
                                        >
                                            <FaGavel className="text-blue-400 text-lg"/> Download {selectedRecord.officialRecord.recordType}
                                        </button>
                                    ) : (
                                        <div className="flex items-center justify-center gap-2 py-3 px-4 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-500 text-xs font-bold cursor-not-allowed">
                                            <FaGavel /> No FIR Filed
                                        </div>
                                    )}

                                    {/* Button 3: Final Closure Report */}
                                    <button 
                                        onClick={() => { generateFinalReport(selectedRecord); toast.success("Downloading Closure Report..."); }}
                                        className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-900/40 hover:bg-emerald-900/60 border border-emerald-500/30 rounded-lg text-emerald-100 text-xs font-bold transition-all hover:scale-[1.02]"
                                    >
                                        <FaFileContract className="text-emerald-400 text-lg"/> Final Closure Report
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};

export default PastCrimes;