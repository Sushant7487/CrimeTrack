
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";
import {
  FaFolderOpen, FaTimes, FaCheckCircle, FaExclamationTriangle,
  FaUser, FaPhoneAlt, FaIdCard, FaMapMarkerAlt, FaExpand, FaCompress, FaUserSecret,
  FaShieldAlt, FaCalendarAlt, FaMapMarkedAlt, FaVolumeUp,
  FaFingerprint, FaGavel, FaHistory, FaFileDownload, FaArrowLeft,
  FaLocationArrow, FaExternalLinkAlt, FaBalanceScale, FaLandmark, FaCommentDots,
  FaGlobeAmericas // ✅ ADDED MISSING IMPORT
} from "react-icons/fa";

// Ensure imports are correct based on your folder structure
import { generateReceipt, generateOfficialRecord, generateFinalReport } from "../utils/PDFGenerator";
import SkeletonLoader from "../components/common/SkeletonLoader";
import TimelineView from "../components/common/TimelineView";

const UserCaseFile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI States
  const [previewImage, setPreviewImage] = useState(null);
  const [expandedMap, setExpandedMap] = useState(false);
  const [mapQuery, setMapQuery] = useState(""); 

  const userInfo = JSON.parse(localStorage.getItem("userInfo")) || {};
  const STATUS_STEPS = ['Received', 'Assigned', 'FIR/NCR Filed', 'Investigation', 'Action', 'Closed'];

  // --- FETCH DATA ---
  const fetchComplaintDetails = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`https://crimetrack-api.onrender.com/api/crime/track/${id}`, config);
      
      if (data) {
        setComplaint(data);
        extractAndSetMapLocation(data.incidentLocationAddress, data.selectedStation);
      } else {
        toast.error("Case not found");
        navigate(-1);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load case details");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && userInfo.token) fetchComplaintDetails();
  }, [id]);

  // --- MAP LOGIC ---
  const extractAndSetMapLocation = (locationAddr, station) => {
    let query = station || "India"; 
    if (locationAddr) {
        if (locationAddr.includes("http") && locationAddr.includes("q=")) {
            const match = locationAddr.match(/q=([^&]+)/);
            if (match && match[1]) query = match[1];
        } 
        else if (locationAddr.includes("Lat:")) {
             const clean = locationAddr.replace("Lat:", "").replace("Long:", "").replace("(Auto-Detected)", "").trim();
             query = clean;
        } 
        else if (!locationAddr.includes("http")) {
            query = locationAddr;
        }
    }
    setMapQuery(query);
  };

  const handleMyLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    toast.loading("Locating...");
    navigator.geolocation.getCurrentPosition(
        (position) => {
            toast.dismiss();
            setMapQuery(`${position.coords.latitude},${position.coords.longitude}`);
            toast.success("Map Updated");
        },
        () => { toast.dismiss(); toast.error("Location Error"); }
    );
  };

  // --- HELPERS ---
  const formatDateTime = (dateString) => {
    try {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleString([], { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch (e) { return "Invalid Date"; }
  };

  const safeIdSlice = (txt) => txt && typeof txt === 'string' ? txt.slice(-6).toUpperCase() : "UNKNOWN";

  const getStatusStep = (status) => {
    const s = status ? status.toLowerCase() : "";
    if (s.includes('closed')) return 5;
    if (s.includes('action')) return 4;
    if (s.includes('investigation')) return 3;
    if (s.includes('fir') || s.includes('ncr')) return 2;
    if (s.includes('assigned')) return 1;
    return 0;
  };

  const getDownloadText = (c) => c.status === "Closed" ? "Download Final Report" : (c.officialRecord?.recordNumber ? "Download FIR Copy" : "Download Acknowledgement");

  const handleDownload = (c) => {
    try {
      if (c.status === "Closed") generateFinalReport(c);
      else if (c.officialRecord?.recordNumber) generateOfficialRecord(c);
      else generateReceipt(c);
      toast.success("Document Generated");
    } catch (err) { console.error(err); toast.error("Failed to generate PDF."); }
  };

  // --- SUB COMPONENTS ---
  const InfoBlock = ({ label, value, icon }) => (
    <div className="flex flex-col border-b border-slate-700/50 pb-3 last:border-0">
      <span className="text-xs text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1.5 mb-1">
        {icon} {label}
      </span>
      <span className="text-base text-slate-100 font-medium font-sans break-words tracking-wide">{value || "—"}</span>
    </div>
  );

  const ProfileCard = ({ title, data, color, photo, isAnonymous }) => {
    const colors = { slate: "border-slate-500", blue: "border-blue-500", red: "border-red-500" };
    return (
      <div className={`bg-slate-900/60 backdrop-blur-md border-t-4 ${colors[color]} rounded-lg p-6 flex flex-col h-full shadow-lg border border-slate-700/50 relative overflow-hidden group hover:shadow-2xl transition-all`}>
        <div className={`absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-${color}-500/10 to-transparent -z-10`}></div>
        <h3 className={`text-${color}-400 text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 drop-shadow-sm`}>{title}</h3>
        {isAnonymous ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-500 opacity-60 min-h-[200px]">
            <FaUserSecret className="text-6xl mb-3" />
            <p className="text-base font-bold uppercase">Anonymous</p>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-6 relative">
              {photo ? (
                <div className="relative cursor-pointer group/img" onClick={() => setPreviewImage(photo)}>
                  <img src={photo} alt={title} className={`w-32 h-32 object-cover rounded-full border-4 border-slate-800 shadow-2xl transition-transform group-hover/img:scale-105`} />
                  <div className="absolute inset-0 rounded-full bg-black/40 hidden group-hover/img:flex items-center justify-center text-white"><FaExpand /></div>
                </div>
              ) : (
                <div className="w-32 h-32 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center text-slate-500 text-sm font-bold uppercase shadow-inner">No Photo</div>
              )}
            </div>
            <div className="space-y-4 flex-1">
              <InfoBlock label="Full Name" value={data.name} icon={<FaUser className={`text-${color}-400`} />} />
              <div className="grid grid-cols-2 gap-4">
                <InfoBlock label="Gender" value={data.gender} />
                {data.age && <InfoBlock label="Age" value={data.age ? `${data.age} Yrs` : null} />}
              </div>
              <InfoBlock label="Contact" value={data.contact} icon={<FaPhoneAlt />} />
              <InfoBlock label="Aadhaar" value={data.aadhar} icon={<FaIdCard />} />
              {data.address && <InfoBlock label="Address" value={data.address} icon={<FaMapMarkerAlt />} />}
            </div>
          </>
        )}
      </div>
    );
  };

  if (loading) return <div className="p-10"><SkeletonLoader count={1} /></div>;
  if (!complaint) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-[#0f172a] text-slate-200 font-sans pb-10 relative overflow-hidden">
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <img src="/dashboard-bg.png" alt="Background" className="w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900/90"></div>
      </div>

      {/* HEADER */}
      <div className="bg-slate-900/80 backdrop-blur-md px-6 py-4 border-b border-slate-700/60 flex justify-between items-center sticky top-0 z-30 shadow-lg relative">
        <div className="flex items-center gap-5">
          {/* ✅ UPDATED: Navigate back to User Complaints List */}
          <button onClick={() => navigate("/user/history")} className="text-slate-400 hover:text-white flex items-center gap-2 text-sm font-bold uppercase tracking-wide transition-colors">
            <FaArrowLeft /> Back
          </button>
          <div className="h-8 w-px bg-slate-700 hidden md:block"></div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-700 text-white rounded-lg flex items-center justify-center text-2xl shadow-lg border border-cyan-500/50"><FaFolderOpen /></div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-white tracking-widest uppercase flex items-center gap-3">
                My Case File
              </h2>
              <div className="flex gap-4 mt-1 text-sm items-center font-mono">
                <span className="text-blue-500 px-2 py-0.5 rounded bg-blue-900/10 border border-blue-600/20">ID: {safeIdSlice(complaint._id)}</span>
                <span className="text-slate-500">|</span>
                <span className="text-slate-300 uppercase font-bold">{complaint.selectedStation}</span>
              </div>
            </div>
          </div>
        </div>
        
        <button onClick={() => handleDownload(complaint)} className="hidden md:flex px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-sm shadow-lg items-center gap-2 uppercase"><FaFileDownload /> {getDownloadText(complaint)}</button>
      </div>

      {/* STATUS BAR */}
      <div className="bg-slate-900/50 backdrop-blur-md border-b border-slate-800 relative z-20 shadow-md mb-8">
        <div className="px-4 md:px-8 py-8 relative overflow-hidden">
          <div className="relative max-w-7xl mx-auto overflow-x-auto">
            <div className="min-w-[600px] relative pb-6">
                <div className="absolute top-5 left-0 w-full h-3 bg-slate-800/80 rounded-full shadow-inner"></div>
                <div className="absolute top-5 left-0 h-3 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-[length:200%_100%] animate-pulse transition-all duration-1000 ease-out shadow-[0_0_20px_#3b82f6] rounded-full" style={{ width: `${Math.min((getStatusStep(complaint.status) / 5) * 100, 100)}%` }}></div>
                
                <div className="flex justify-between relative w-full pt-1">
                {STATUS_STEPS.map((step, i) => {
                    const isActive = i <= getStatusStep(complaint.status);
                    return (
                    <div key={i} className="flex flex-col items-center gap-3 z-10 w-28 group">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold border-2 transition-all duration-500 ${isActive ? 'bg-slate-900 border-cyan-400 text-cyan-400 scale-110 shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'bg-slate-800 border-slate-700 text-slate-600'}`}>
                        {isActive ? <FaCheckCircle /> : i + 1}
                        </div>
                        <p className={`text-xs font-bold uppercase tracking-widest text-center transition-colors duration-300 ${isActive ? 'text-cyan-400 drop-shadow-md' : 'text-slate-600'}`}>{step}</p>
                    </div>
                    );
                })}
                </div>
            </div>
          </div>
        </div>
      </div>

      {/* BODY CONTENT */}
      <div className="max-w-[100rem] mx-auto p-6 md:p-10 relative z-10">
        
        {/* 🔥 POLICE NOTE SECTION */}
        {complaint.importantNote?.text && (
          <div className="mb-10 bg-yellow-900/10 border-l-4 border-yellow-500 bg-slate-800/50 p-6 rounded-r-lg shadow-lg flex items-start gap-4 animate-fade-in-up">
              <div className="bg-yellow-500/20 p-3 rounded-full text-yellow-500 shrink-0 border border-yellow-500/30">
                <FaExclamationTriangle className="text-xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-yellow-500 font-bold uppercase text-sm tracking-widest mb-2">Important Note from Police</h3>
                <p className="text-slate-200 text-sm leading-relaxed italic bg-black/20 p-3 rounded border border-yellow-500/10">"{complaint.importantNote.text}"</p>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">Last Updated: {formatDateTime(complaint.importantNote.updatedAt || complaint.updatedAt)}</p>
                    <span className="text-[10px] bg-yellow-900/40 text-yellow-200 px-2 py-0.5 rounded border border-yellow-500/30">Official Communication</span>
                </div>
              </div>
          </div>
        )}

        {/* ✅ NEW: OFFICER ASSIGNMENT & CHAT SECTION */}
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg p-6 mb-10 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
                <h3 className="text-slate-300 font-bold uppercase text-sm tracking-widest mb-1 flex items-center gap-2">
                    <FaUserSecret className="text-blue-400" /> Investigating Officer
                </h3>
                {complaint.assignedOfficer && complaint.assignedOfficer !== "Not Assigned" ? (
                    <p className="text-white text-lg font-bold">{complaint.assignedOfficer}</p>
                ) : (
                    <p className="text-slate-500 italic">Pending Assignment...</p>
                )}
            </div>

            {/* Chat Button (Only if assigned) */}
            {complaint.assignedOfficerId && (
                <button 
                    onClick={() => navigate(`/chat/${complaint.assignedOfficerId}`)}
                    className="bg-[#00a884] hover:bg-[#008f6f] text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-transform hover:scale-105 active:scale-95"
                >
                    <FaCommentDots className="text-lg" /> Chat with Officer
                </button>
            )}
        </div>

        {/* ROW 1: PROFILES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {!complaint.isAnonymous && complaint.user && (
            <ProfileCard
              title="Registered By (Me)"
              color="slate"
              isAnonymous={false}
              photo={complaint.user?.idPhoto || null} 
              data={{
                name: `${complaint.user.title || ''} ${complaint.user.firstName || ''} ${complaint.user.lastName || ''}`.trim(),
                gender: complaint.user.gender || "N/A",
                contact: complaint.user.mobile || "N/A",
                aadhar: complaint.user.aadhar || "N/A",
              }}
            />
          )}

          <ProfileCard
            title="Victim Information"
            color="blue"
            photo={complaint.victimIdPhoto}
            data={{
              name: `${complaint.victimTitle} ${complaint.victimName}`,
              gender: complaint.victimGender,
              age: complaint.victimAge,
              contact: complaint.victimContact,
              aadhar: complaint.victimAadhar,
              address: complaint.victimAddress
            }}
          />
          <ProfileCard
            title="Suspect Information"
            color="red"
            photo={complaint.suspectIdPhoto}
            isAnonymous={!complaint.suspectName || complaint.suspectName === "Unknown"}
            data={{
              name: `${complaint.suspectTitle || ""} ${complaint.suspectName}`,
              gender: complaint.suspectGender,
              age: complaint.suspectAge,
              contact: complaint.suspectContact,
              aadhar: complaint.suspectAadhar,
              address: complaint.suspectAddress
            }}
          />
        </div>

        {/* ROW 2: INCIDENT & MAP */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <div className="xl:col-span-1 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg p-8 shadow-lg h-full">
            <h3 className="text-amber-500 font-bold uppercase text-sm tracking-widest mb-6 flex items-center gap-2 border-b border-slate-700 pb-3"><FaExclamationTriangle /> Incident Details</h3>
            <div className="space-y-6">
              <InfoBlock label="Category" value={complaint.crimeType} icon={<FaShieldAlt className="text-amber-500" />} />
              <InfoBlock label="Date & Time" value={formatDateTime(complaint.dateOfIncident)} icon={<FaCalendarAlt className="text-amber-500" />} />
              <InfoBlock label="Concerned Station" value={complaint.selectedStation} icon={<FaMapMarkerAlt className="text-amber-500" />} />
              <div className="pt-2">
                <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block mb-2">Description</span>
                <div className="bg-slate-900/50 p-4 rounded border border-slate-700/50 text-base text-slate-300 leading-relaxed max-h-60 overflow-y-auto custom-scrollbar">
                  {complaint.description}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:col-span-2 bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg p-2 shadow-lg h-full flex flex-col relative group">
            <div className="absolute top-4 left-4 z-10 bg-slate-900/80 backdrop-blur px-4 py-2 rounded border border-slate-600 text-sm font-bold text-white flex items-center gap-2">
              <FaMapMarkedAlt className="text-red-500" /> Incident Location
            </div>
            
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button onClick={handleMyLocation} className="bg-blue-600/90 hover:bg-blue-500 text-white p-2.5 rounded text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm shadow-lg transition-all" title="Show My Location">
                <FaLocationArrow /> 
              </button>
              {complaint.incidentLocationAddress?.includes("http") && (
                  <a href={complaint.incidentLocationAddress} target="_blank" rel="noreferrer" className="bg-slate-700/90 hover:bg-slate-600 text-white p-2.5 rounded text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm shadow-lg transition-all" title="Open in Google Maps">
                    <FaExternalLinkAlt />
                  </a>
              )}
              <button onClick={() => setExpandedMap(!expandedMap)} className="bg-slate-900/80 hover:bg-black text-white p-2.5 rounded text-xs font-bold uppercase flex items-center gap-2 backdrop-blur-sm border border-slate-600 transition-all">
                {expandedMap ? <><FaCompress /> Minimize</> : <><FaExpand /> Full Map</>}
              </button>
            </div>
            
            <div className={`w-full h-full min-h-[400px] bg-slate-900 rounded overflow-hidden relative ${expandedMap ? 'fixed inset-4 z-[10000] border-4 border-amber-500 shadow-2xl' : ''}`}>
              <iframe
                title="Incident Location"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(110%)' }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}>
              </iframe>
              <div className="absolute bottom-5 left-5 right-5 bg-black/70 backdrop-blur-md p-4 rounded border border-slate-600 flex items-center gap-3">
                <FaGlobeAmericas className="text-blue-400 text-2xl" />
                <div className="overflow-hidden">
                    <p className="text-xs text-slate-400 uppercase font-bold">Source Link Data</p>
                    <p className="text-sm text-white font-mono font-medium truncate">{complaint.incidentLocationAddress || "N/A"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: EVIDENCE VAULT */}
        {(complaint.incidentProof?.length > 0 || complaint.evidence?.length > 0) && (
          <div className="mb-10">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden shadow-lg">
              <div className="bg-slate-900/50 px-8 py-4 border-b border-slate-700 flex justify-between items-center">
                <h3 className="text-purple-400 text-sm font-extrabold uppercase tracking-widest flex items-center gap-2"><FaFolderOpen /> Evidence Vault</h3>
                <span className="text-xs bg-purple-900/30 text-purple-300 px-3 py-1 rounded border border-purple-500/30 font-bold">
                  {complaint.incidentProof?.length + complaint.evidence?.length} FILES
                </span>
              </div>
              <div className="p-8 bg-[#0b1120]/80">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {[...(complaint.incidentProof || []), ...(complaint.evidence || [])].map((url, idx) => {
                    const isVideo = url.match(/\.(mp4|mov|webm)$/i);
                    const isAudio = url.match(/\.(mp3|wav|aac)$/i);
                    return (
                      <div key={idx} className="group relative bg-black rounded-lg border border-slate-700 overflow-hidden shadow-md hover:border-purple-500 transition-all aspect-video">
                        {isVideo ? (
                          <video controls className="w-full h-full object-cover" src={url}></video>
                        ) : isAudio ? (
                          <div className="w-full h-full flex flex-col items-center justify-center bg-slate-900 p-2 text-center relative overflow-hidden">
                            <div className="absolute inset-0 bg-purple-500/5"></div>
                            <FaVolumeUp className="text-4xl text-purple-500 mb-2 relative z-10" />
                            <audio controls src={url} className="w-full h-8 scale-75 relative z-10"></audio>
                          </div>
                        ) : (
                          <div className="w-full h-full cursor-pointer relative" onClick={() => setPreviewImage(url)}>
                            <img src={url} alt={`Evidence ${idx}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity">
                              <FaExpand className="text-white text-3xl" />
                            </div>
                          </div>
                        )}
                        <div className="absolute top-2 right-2 bg-purple-900/90 px-2 py-0.5 rounded text-[10px] text-white uppercase font-bold tracking-wider backdrop-blur-sm border border-purple-500/30">
                          {isVideo ? "Video" : isAudio ? "Audio" : "Img"} #{idx + 1}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ROW 4: OFFICIAL RECORD (DETAILED VIEW) & LOG */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-10">
          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden h-full flex flex-col">
            <div className="bg-slate-900/50 px-8 py-4 border-b border-slate-700">
              <h3 className="text-cyan-400 text-sm font-extrabold uppercase flex items-center gap-2"><FaFingerprint /> Official Investigation Record</h3>
            </div>
            
            <div className="p-8 flex-1">
              {complaint.officialRecord?.recordNumber ? (
                <div className="bg-slate-900/80 rounded-xl border border-emerald-500/30 overflow-hidden shadow-2xl relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-900/40 to-slate-900 p-5 border-b border-emerald-500/20 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <div className="bg-emerald-500/20 p-2 rounded-lg text-emerald-400 border border-emerald-500/30"><FaGavel /></div>
                            <div>
                                <h4 className="text-white font-bold text-lg tracking-wide">{complaint.officialRecord.recordType} RECORDED</h4>
                                <p className="text-emerald-400 font-mono text-xs tracking-widest font-bold">{complaint.officialRecord.recordNumber}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDownload(complaint)} className="hidden md:flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                            <FaFileDownload /> Download Copy
                        </button>
                    </div>

                    {/* Details Grid */}
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm">
                        <div className="space-y-1">
                            <span className="text-xs text-slate-500 uppercase font-bold block">Filing Date</span>
                            <span className="text-white font-medium">{formatDateTime(complaint.officialRecord.recordDate)}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-slate-500 uppercase font-bold block">Police Station</span>
                            <span className="text-white font-medium uppercase">{complaint.selectedStation}</span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-slate-500 uppercase font-bold block">Investigating Officer</span>
                            <span className="text-white font-medium flex items-center gap-2">
                                <FaUser className="text-slate-400 text-xs"/> {complaint.officialRecord.investigatingOfficer}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <span className="text-xs text-slate-500 uppercase font-bold block">Rank / Designation</span>
                            <span className="text-white font-medium bg-slate-800 px-2 py-0.5 rounded text-xs inline-block border border-slate-700">{complaint.officialRecord.rank}</span>
                        </div>
                        <div className="col-span-1 md:col-span-2 pt-2 border-t border-slate-800 mt-2">
                            <span className="text-xs text-slate-500 uppercase font-bold block mb-1">Occurrence Details</span>
                            <p className="text-slate-300 text-xs leading-relaxed">
                                <span className="text-slate-400">Date:</span> {complaint.officialRecord.occurrenceDate}  | 
                                <span className="text-slate-400"> Time:</span> {complaint.officialRecord.occurrenceTime}
                            </p>
                            <p className="text-slate-300 text-xs mt-1"><span className="text-slate-400">Location:</span> {complaint.officialRecord.incidentPlace}</p>
                        </div>
                    </div>

                    {/* Acts Section */}
                    {complaint.officialRecord.acts && complaint.officialRecord.acts.length > 0 && (
                        <div className="bg-black/30 p-4 border-t border-slate-800">
                            <span className="text-xs text-red-400 uppercase font-bold block mb-2 flex items-center gap-2"><FaBalanceScale /> Applicable Acts & Sections</span>
                            <div className="flex flex-wrap gap-2">
                                {complaint.officialRecord.acts.map((act, i) => (
                                    <span key={i} className="text-xs bg-red-900/20 text-red-300 border border-red-500/30 px-3 py-1 rounded-full font-mono">
                                        {act.actName} - Sec {act.section}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Mobile Download Button */}
                    <button onClick={() => handleDownload(complaint)} className="md:hidden w-full bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold py-3 text-center border-t border-emerald-500/30">
                        Download Official Copy
                    </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-600 p-10 rounded-xl text-center opacity-60 bg-slate-900/30 flex flex-col items-center justify-center h-full min-h-[300px]">
                  <FaLandmark className="text-5xl text-slate-500 mb-4" />
                  <p className="text-slate-400 font-bold text-base uppercase tracking-widest">Pending Official Filing</p>
                  <p className="text-slate-600 text-sm mt-2 max-w-xs mx-auto">No FIR/NCR has been generated yet. Investigation officer needs to file the record.</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-lg overflow-hidden h-full">
            <div className="bg-slate-900/50 px-8 py-4 border-b border-slate-700">
              <h3 className="text-slate-400 text-sm font-extrabold uppercase flex items-center gap-2"><FaHistory /> Activity Timeline</h3>
            </div>
            <div className="p-8 h-full">
               <div className="text-slate-200">
                  <TimelineView history={complaint.statusHistory || []} />
               </div>
            </div>
          </div>
        </div>
      </div>

      {previewImage && createPortal(
        <div className="fixed inset-0 bg-black/95 z-[10000] flex items-center justify-center p-4 backdrop-blur-xl" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Full View" className="max-w-full max-h-[90vh] rounded border border-slate-600 shadow-2xl" />
          <button className="absolute top-5 right-5 text-white text-4xl hover:text-red-500 transition-colors"><FaTimes /></button>
        </div>,
        document.body
      )}
    </motion.div>
  );
};

export default UserCaseFile;
