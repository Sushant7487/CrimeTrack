


import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { 
    FaFilePdf, FaDownload, FaFileContract, FaGavel, 
    FaCheckCircle, FaClock, FaSearch, FaExclamationCircle 
} from "react-icons/fa";

// ✅ Import PDF Generators
import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../../utils/PDFGenerator";
import SkeletonLoader from "../common/SkeletonLoader";

const Documentation = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("ALL"); // ALL, FIR, CLOSED

    // ✅ 1. Fetch User's Real Reports
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                if (!userInfo) return;

                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get("http://localhost:5000/api/crime/myreports", config);
                setReports(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching docs:", error);
                toast.error("Failed to load documents.");
                setLoading(false);
            }
        };
        fetchDocuments();
    }, []);

    // ✅ 2. Handle Download Logic
    const handleDownload = (type, data) => {
        try {
            if (type === "RECEIPT") {
                generateReceipt(data);
                toast.success("Downloading Acknowledgement...");
            } else if (type === "FIR" || type === "NCR") {
                generateOfficialRecord(data);
                toast.success(`Downloading ${type} Copy...`);
            } else if (type === "CLOSURE") {
                generateFinalReport(data);
                toast.success("Downloading Closure Report...");
            }
        } catch (error) {
            toast.error("Download failed.");
        }
    };

    // ✅ 3. Filtering Logic
    const filteredReports = reports.filter(r => {
        if (filter === "FIR") return r.officialRecord?.recordNumber;
        if (filter === "CLOSED") return r.status === "Closed";
        return true;
    });

    return (
        <div className="font-sans text-slate-200 animate-fade-in-up">
            
            {/* --- HEADER SECTION --- */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-slate-700 pb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        <FaFileContract className="text-blue-500" /> My Legal Documentation
                    </h2>
                    <p className="text-slate-400 text-sm mt-1">Access and download official records linked to your registered complaints.</p>
                </div>
                
                {/* Filter Tabs */}
                <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 mt-4 md:mt-0">
                    {["ALL", "FIR", "CLOSED"].map((f) => (
                        <button 
                            key={f} 
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${filter === f ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white"}`}
                        >
                            {f === "ALL" ? "All Files" : f === "FIR" ? "FIR / NCR" : "Final Reports"}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- DOCUMENTS GRID --- */}
            {loading ? <SkeletonLoader count={3} /> : filteredReports.length === 0 ? (
                <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                    <FaSearch className="mx-auto text-slate-600 text-4xl mb-4" />
                    <p className="text-slate-400 font-medium">No documents found in this category.</p>
                    <p className="text-slate-500 text-xs">Once you file a complaint, documents will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {filteredReports.map((report) => {
                        const isFIR = !!report.officialRecord?.recordNumber;
                        const isClosed = report.status === "Closed";

                        return (
                            <div key={report._id} className="bg-slate-800 border border-slate-700 rounded-lg p-5 hover:border-blue-500/40 transition-all shadow-lg flex flex-col md:flex-row justify-between gap-6 group">
                                
                                {/* LEFT: Case Info */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="bg-slate-900 text-slate-300 border border-slate-600 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider">
                                            ID: {report._id.slice(-8).toUpperCase()}
                                        </span>
                                        {isClosed ? (
                                            <span className="bg-green-900/30 text-green-400 border border-green-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                                                <FaCheckCircle size={10} /> Investigation Closed
                                            </span>
                                        ) : isFIR ? (
                                            <span className="bg-red-900/30 text-red-400 border border-red-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                                                <FaGavel size={10} /> {report.officialRecord.recordType} Filed
                                            </span>
                                        ) : (
                                            <span className="bg-blue-900/30 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1">
                                                <FaClock size={10} /> Processing
                                            </span>
                                        )}
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{report.crimeType}</h3>
                                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">{report.description}</p>
                                    <p className="text-[10px] text-slate-500 mt-2 font-mono">Date Reported: {new Date(report.createdAt).toLocaleDateString()}</p>
                                </div>

                                {/* RIGHT: Download Actions (Dynamic) */}
                                <div className="flex flex-col sm:flex-row items-center gap-3">
                                    
                                    {/* 1. Always Available: Receipt */}
                                    <button 
                                        onClick={() => handleDownload("RECEIPT", report)}
                                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded border border-slate-600 transition-all"
                                        title="Download Acknowledgement"
                                    >
                                        <FaFilePdf className="text-blue-400" /> Receipt
                                    </button>

                                    {/* 2. Available if FIR/NCR Filed */}
                                    {isFIR && (
                                        <button 
                                            onClick={() => handleDownload(report.officialRecord.recordType, report)}
                                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold rounded border border-slate-600 transition-all"
                                            title="Download Official Record"
                                        >
                                            <FaGavel className="text-red-400" /> {report.officialRecord.recordType} Copy
                                        </button>
                                    )}

                                    {/* 3. Available if Closed */}
                                    {isClosed ? (
                                        <button 
                                            onClick={() => handleDownload("CLOSURE", report)}
                                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded shadow-lg shadow-green-900/20 transition-all"
                                            title="Download Final Report"
                                        >
                                            <FaDownload /> Final Report
                                        </button>
                                    ) : (
                                        <div className="w-full sm:w-auto px-4 py-2 border border-dashed border-slate-600 rounded text-center text-[10px] text-slate-500 cursor-not-allowed flex items-center justify-center gap-1 opacity-60">
                                            <FaExclamationCircle /> Report Pending
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* --- STATIC RESOURCES SECTION (Moved to bottom, kept clean) --- */}
            <div className="mt-12 pt-8 border-t border-slate-800">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">General Legal Templates (For Reference)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Bail Application Format', 'RTI Request Form', 'Affidavit Template'].map((item, idx) => (
                        <div key={idx} className="bg-slate-900/50 p-4 rounded border border-slate-700 flex justify-between items-center group cursor-pointer hover:border-slate-500 transition-colors">
                            <span className="text-xs font-semibold text-slate-300">{item}</span>
                            <FaDownload className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Documentation;