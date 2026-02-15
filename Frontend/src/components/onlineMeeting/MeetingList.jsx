// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import { FaVideo, FaCalendarAlt } from 'react-icons/fa';

// const MeetingList = () => {
//   const [meetings, setMeetings] = useState([]);
//   const navigate = useNavigate();
//   const userId = JSON.parse(localStorage.getItem('userInfo'))?._id;

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const { data } = await api.get('/api/meetings/my-meetings');
//         setMeetings(data);
//       } catch (error) {
//         console.error("Error fetching meetings");
//       }
//     };
//     fetchMeetings();
//   }, []);

//   const handleJoin = (meeting) => {
//     // Jitsi Room Name
//     navigate(`/meeting/room/${meeting.roomName}`, { 
//       state: { 
//         isAdmin: meeting.host._id === userId, // If I am the host, I am Admin
//         username: JSON.parse(localStorage.getItem('userInfo'))?.name 
//       } 
//     });
//   };

//   return (
//     <div className="p-8 text-white max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">Upcoming Meetings</h2>
      
//       {meetings.length === 0 ? <p className="text-gray-400">No scheduled meetings.</p> : (
//         <div className="space-y-4">
//           {meetings.map(m => (
//             <div key={m._id} className="bg-slate-800 p-4 rounded-lg border border-slate-700 flex justify-between items-center">
//               <div>
//                 <h3 className="font-bold text-lg text-cyan-400">{m.title}</h3>
//                 <p className="text-sm text-gray-300 flex items-center gap-2">
//                   <FaCalendarAlt /> {new Date(m.scheduledTime).toLocaleString()}
//                 </p>
//                 <p className="text-xs text-gray-500 uppercase mt-1">{m.meetingType} Meeting • Host: {m.host.firstName}</p>
//               </div>
              
//               {/* Logic: Join button only appears if meeting is within reasonable time (e.g., 10 mins before) or anytime for demo */}
//               <button 
//                 onClick={() => handleJoin(m)}
//                 className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded flex items-center gap-2 font-bold"
//               >
//                 <FaVideo /> Join
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MeetingList;











// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import { FaVideo, FaCalendarAlt, FaClock, FaUserShield, FaLaptop, FaChevronRight } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const MeetingList = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const { data } = await api.get('/api/meetings/my-meetings');
//         setMeetings(data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching meetings");
//         setLoading(false);
//       }
//     };
//     fetchMeetings();
//   }, []);

//   const handleJoin = (meeting) => {
//     // Navigate to Jitsi Room with Admin/User status
//     navigate(`/meeting/room/${meeting.roomName}`, { 
//       state: { 
//         isAdmin: meeting.host._id === userInfo?._id, 
//         username: userInfo?.name || "Citizen"
//       } 
//     });
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
//   };

//   const formatTime = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
//   };

//   return (
//     <div className="p-4 md:p-8 text-white max-w-5xl mx-auto">
      
//       {/* Header Section */}
//       <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
//         <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-3 rounded-xl shadow-lg">
//           <FaLaptop className="text-2xl text-white" />
//         </div>
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-white">Online Video Inquiries</h2>
//           <p className="text-gray-400 text-sm md:text-base">Join scheduled meetings with Police Officers securely.</p>
//         </div>
//       </div>
      
//       {loading ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//            <p>Loading schedule...</p>
//         </div>
//       ) : meetings.length === 0 ? (
//         <motion.div 
//           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//           className="bg-slate-800/50 border border-slate-700 rounded-2xl p-10 text-center"
//         >
//           <div className="bg-slate-700/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
//             <FaCalendarAlt className="text-4xl text-slate-500" />
//           </div>
//           <h3 className="text-xl font-bold text-slate-300">No Meetings Scheduled</h3>
//           <p className="text-gray-500 mt-2">You have no upcoming video inquiries pending.</p>
//         </motion.div>
//       ) : (
//         <div className="grid gap-6">
//           {meetings.map((m, index) => (
//             <motion.div 
//               key={m._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/50 transition-all group"
//             >
//               <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                
//                 {/* Left: Info */}
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="bg-blue-900/30 text-blue-300 border border-blue-500/30 text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
//                       {m.meetingType} MEETING
//                     </span>
//                     <span className="bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 text-[10px] md:text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
//                       SCHEDULED
//                     </span>
//                   </div>
                  
//                   <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
//                     {m.title}
//                   </h3>
                  
//                   <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3">
//                     <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                        <FaUserShield className="text-blue-500" />
//                        <span>Host: <span className="text-gray-200 font-medium">{m.host?.firstName} {m.host?.lastName}</span></span>
//                     </div>
//                     <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                        <FaCalendarAlt className="text-amber-500" />
//                        <span>{formatDate(m.scheduledTime)}</span>
//                     </div>
//                     <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                        <FaClock className="text-green-500" />
//                        <span>{formatTime(m.scheduledTime)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right: Action Button */}
//                 <button 
//                   onClick={() => handleJoin(m)}
//                   className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-2"
//                 >
//                   <FaVideo /> Join Meeting <FaChevronRight className="text-xs opacity-70" />
//                 </button>

//               </div>
              
//               {/* Decorative Bar */}
//               <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-500"></div>
//             </motion.div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MeetingList;










// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import { FaVideo, FaCalendarAlt, FaClock, FaUserShield, FaUser, FaLaptop, FaChevronRight, FaHourglassEnd } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const MeetingList = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const { data } = await api.get('/api/meetings/my-meetings');
        
//         // Filter Logic (Expired meetings remove)
//         const validMeetings = data.filter(meeting => {
//             if (!meeting.endTime) return true;
//             const endTime = new Date(meeting.endTime).getTime();
//             const now = new Date().getTime();
//             return now <= (endTime + 2 * 60 * 1000);
//         });

//         setMeetings(validMeetings);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching meetings");
//         setLoading(false);
//       }
//     };
    
//     fetchMeetings();
//     const interval = setInterval(fetchMeetings, 60000); 
//     return () => clearInterval(interval);

//   }, []);

//   const handleJoin = (meeting) => {
//     navigate(`/meeting/room/${meeting.roomName}`, { 
//       state: { 
//         isAdmin: meeting.host._id === userInfo?._id, 
//         username: userInfo?.name || "User"
//       } 
//     });
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
//   const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

//   return (
//     <div className="p-4 md:p-8 text-white max-w-5xl mx-auto">
      
//       <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
//         <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-3 rounded-xl shadow-lg">
//           <FaLaptop className="text-2xl text-white" />
//         </div>
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-white">Video Sessions</h2>
//           <p className="text-gray-400 text-sm md:text-base">Manage and join your active inquiries.</p>
//         </div>
//       </div>
      
//       {loading ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//            <p>Syncing schedule...</p>
//         </div>
//       ) : meetings.length === 0 ? (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-10 text-center">
//           <p className="text-gray-500">No upcoming meetings found.</p>
//         </motion.div>
//       ) : (
//         <div className="grid gap-6">
//           {meetings.map((m, index) => {
//              // ✅ Logic: Am I the Host?
//              const isMeHost = m.host._id === userInfo?._id;

//              return (
//             <motion.div 
//               key={m._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/50 transition-all group"
//             >
//               <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="bg-blue-900/30 text-blue-300 border border-blue-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase">
//                       {m.meetingType}
//                     </span>
//                     {/* Live Badge */}
//                     {new Date() >= new Date(m.startTime) && new Date() <= new Date(m.endTime) ? (
//                         <span className="bg-red-600 text-white animate-pulse text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">● LIVE</span>
//                     ) : (
//                         <span className="bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase">UPCOMING</span>
//                     )}
//                   </div>
                  
//                   <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                  
//                   <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3">
//                     {/* ✅ Display Logic Change */}
//                     {isMeHost ? (
//                         <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                             <FaUser className="text-purple-400" />
//                             <span>With: <span className="text-white font-medium">{m.participant ? `${m.participant.firstName} ${m.participant.lastName}` : "Unknown"}</span></span>
//                         </div>
//                     ) : (
//                         <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                             <FaUserShield className="text-blue-500" />
//                             <span>Host: <span className="text-white font-medium">{m.host.firstName} {m.host.lastName}</span></span>
//                         </div>
//                     )}

//                     <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                        <FaClock className="text-green-500" />
//                        <span>{formatTime(m.startTime)} - {formatTime(m.endTime)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button 
//                   onClick={() => handleJoin(m)}
//                   className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
//                 >
//                   <FaVideo /> {isMeHost ? "Start Meeting" : "Join Meeting"}
//                 </button>

//               </div>
//             </motion.div>
//           )})}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MeetingList;












// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import { FaVideo, FaCalendarAlt, FaClock, FaUserShield, FaUser, FaLaptop, FaChevronRight, FaHourglassEnd } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// const MeetingList = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const { data } = await api.get('/api/meetings/my-meetings');
        
//         // Filter Logic (Remove meetings older than End Time + 2 mins)
//         const validMeetings = data.filter(meeting => {
//             if (!meeting.endTime) return true;
//             const endTime = new Date(meeting.endTime).getTime();
//             const now = new Date().getTime();
//             return now <= (endTime + 2 * 60 * 1000);
//         });

//         setMeetings(validMeetings);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching meetings");
//         setLoading(false);
//       }
//     };
    
//     fetchMeetings();
//     const interval = setInterval(fetchMeetings, 60000); 
//     return () => clearInterval(interval);

//   }, []);

//   const handleJoin = (meeting) => {
//     navigate(`/meeting/room/${meeting.roomName}`, { 
//       state: { 
//         isAdmin: meeting.host._id === userInfo?._id, 
//         username: userInfo?.name || "User"
//       } 
//     });
//   };

//   const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
//   const formatTime = (dateString) => new Date(dateString).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

//   return (
//     <div className="p-4 md:p-8 text-white max-w-5xl mx-auto">
      
//       <div className="flex items-center gap-4 mb-8 border-b border-gray-700 pb-4">
//         <div className="bg-gradient-to-br from-cyan-600 to-blue-600 p-3 rounded-xl shadow-lg">
//           <FaLaptop className="text-2xl text-white" />
//         </div>
//         <div>
//           <h2 className="text-2xl md:text-3xl font-bold text-white">Video Sessions</h2>
//           <p className="text-gray-400 text-sm md:text-base">Manage and join your active inquiries.</p>
//         </div>
//       </div>
      
//       {loading ? (
//         <div className="flex flex-col items-center justify-center py-20 text-gray-500">
//            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500 mb-4"></div>
//            <p>Syncing schedule...</p>
//         </div>
//       ) : meetings.length === 0 ? (
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-10 text-center">
//           <p className="text-gray-500">No upcoming meetings found.</p>
//         </motion.div>
//       ) : (
//         <div className="grid gap-6">
//           {meetings.map((m, index) => {
//              // ✅ Logic: Am I the Host?
//              const isMeHost = m.host._id === userInfo?._id;

//              return (
//             <motion.div 
//               key={m._id}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: index * 0.1 }}
//               className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-lg hover:shadow-2xl hover:border-blue-500/50 transition-all group"
//             >
//               <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                
//                 <div className="flex-1">
//                   <div className="flex items-center gap-3 mb-2">
//                     <span className="bg-blue-900/30 text-blue-300 border border-blue-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase">
//                       {m.meetingType}
//                     </span>
//                     {/* Live Badge */}
//                     {new Date() >= new Date(m.startTime) && new Date() <= new Date(m.endTime) ? (
//                         <span className="bg-red-600 text-white animate-pulse text-[10px] font-bold px-2 py-1 rounded uppercase flex items-center gap-1">● LIVE</span>
//                     ) : (
//                         <span className="bg-emerald-900/30 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-1 rounded uppercase">UPCOMING</span>
//                     )}
//                   </div>
                  
//                   <h3 className="text-xl font-bold text-white mb-2">{m.title}</h3>
                  
//                   <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3">
//                     {/* ✅ Display Logic Change: Handle Multiple Participants */}
//                     {isMeHost ? (
//                         <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                             <FaUser className="text-purple-400" />
//                             <span>With: <span className="text-white font-medium">
//                                 {m.participants && m.participants.length > 0 
//                                     ? `${m.participants[0].firstName} ${m.participants.length > 1 ? `+${m.participants.length - 1} others` : ''}` 
//                                     : "No Participants"}
//                             </span></span>
//                         </div>
//                     ) : (
//                         <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                             <FaUserShield className="text-blue-500" />
//                             <span>Host: <span className="text-white font-medium">{m.host.firstName} {m.host.lastName}</span></span>
//                         </div>
//                     )}

//                     <div className="flex items-center gap-2 bg-slate-900/50 px-3 py-1.5 rounded-lg border border-slate-700">
//                        <FaClock className="text-green-500" />
//                        <span>{formatTime(m.startTime)} - {formatTime(m.endTime)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <button 
//                   onClick={() => handleJoin(m)}
//                   className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
//                 >
//                   <FaVideo /> {isMeHost ? "Start Meeting" : "Join Meeting"}
//                 </button>

//               </div>
//             </motion.div>
//           )})}
//         </div>
//       )}
//     </div>
//   );
// };

// export default MeetingList;




















// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import api from '../../api/axios';
// import { FaVideo, FaCalendarAlt, FaClock, FaUserShield, FaUser, FaLaptop, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
// import { motion } from 'framer-motion';

// // --- SUB-COMPONENT: Countdown Timer ---
// const CountdownTimer = ({ targetDate }) => {
//     const [timeLeft, setTimeLeft] = useState("");

//     useEffect(() => {
//         const calculateTime = () => {
//             const now = new Date().getTime();
//             const target = new Date(targetDate).getTime();
//             const diff = target - now;

//             if (diff <= 0) {
//                 setTimeLeft("Started");
//                 return;
//             }

//             const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//             const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//             setTimeLeft(`${minutes}m ${seconds}s`);
//         };

//         calculateTime();
//         const interval = setInterval(calculateTime, 1000);
//         return () => clearInterval(interval);
//     }, [targetDate]);

//     return (
//         <span className="font-mono font-bold text-yellow-400 text-[10px] md:text-xs">
//             {timeLeft === "Started" ? <span className="text-red-500 animate-pulse">LIVE</span> : `in ${timeLeft}`}
//         </span>
//     );
// };

// // --- MAIN COMPONENT ---
// const MeetingList = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
//   // Background Image
//   const bgImage = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770326291/ChatGPT_Image_Feb_6_2026_02_04_23_AM_zkg6x7.png";

//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const { data } = await api.get('/api/meetings/my-meetings');
        
//         const validMeetings = data.filter(meeting => {
//             if (!meeting.endTime) return true;
//             const endTime = new Date(meeting.endTime).getTime();
//             const now = new Date().getTime();
//             return now <= (endTime + 2 * 60 * 1000);
//         });

//         setMeetings(validMeetings);
//         setLoading(false);
//       } catch (error) { setLoading(false); }
//     };
    
//     fetchMeetings();
//     const interval = setInterval(fetchMeetings, 60000); 
//     return () => clearInterval(interval);

//   }, []);

//   const handleJoin = (meeting) => {
//     navigate(`/meeting/room/${meeting.roomName}`, { 
//       state: { isAdmin: meeting.host._id === userInfo?._id, username: userInfo?.name || "User" } 
//     });
//   };

//   return (
//     // ✅ Fix: h-screen to prevent background scrolling
//     <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
        
//         {/* Fixed Background */}
//         <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.2) blur(3px)" }} />

//         {/* Scrollable Content */}
//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-4 md:p-10">
//             <div className="max-w-5xl mx-auto pb-20">
                
//                 {/* --- HEADER --- */}
//                 <div className="flex items-center justify-between mb-6 md:mb-8 border-b border-white/10 pb-4">
//                     <div className="flex items-center gap-3 md:gap-4">
//                         <button onClick={() => navigate(-1)} className="bg-white/10 p-2 md:p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md border border-white/10">
//                             <FaArrowLeft className="text-sm md:text-base" />
//                         </button>
//                         <div>
//                             <h2 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2">
//                                 <FaLaptop className="text-indigo-400" /> Scheduled Meetings
//                             </h2>
//                             <p className="text-gray-400 text-xs md:text-sm">Upcoming video sessions and briefings</p>
//                         </div>
//                     </div>
//                 </div>

//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20 opacity-70">
//                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
//                        <p className="text-indigo-200 text-sm">Syncing secure schedule...</p>
//                     </div>
//                 ) : meetings.length === 0 ? (
//                     <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 rounded-2xl p-10 text-center">
//                         <FaCalendarAlt className="text-4xl md:text-6xl text-slate-700 mx-auto mb-4" />
//                         <h3 className="text-lg md:text-xl font-bold text-slate-300">No Meetings Scheduled</h3>
//                         <p className="text-gray-500 text-sm mt-2">You have no upcoming video inquiries pending.</p>
//                     </div>
//                 ) : (
//                     <div className="grid gap-4 md:gap-6">
//                         {meetings.map((m, index) => {
//                             const isMeHost = m.host._id === userInfo?._id;
//                             const isPoliceType = m.meetingType === 'Police';

//                             return (
//                             <motion.div 
//                                 key={m._id}
//                                 initial={{ opacity: 0, y: 10 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                                 className={`relative bg-slate-900/80 backdrop-blur-xl border rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 
//                                     p-4 md:p-6 
//                                     ${isPoliceType ? 'border-emerald-500/30' : 'border-blue-500/30'}`}
//                             >
//                                 {/* Colored Bar */}
//                                 <div className={`absolute top-0 left-0 w-1 h-full ${isPoliceType ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>

//                                 <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
                                    
//                                     {/* Info Section */}
//                                     <div className="flex-1 w-full min-w-0">
//                                         {/* Badges Row */}
//                                         <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
//                                             <span className={`text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border ${isPoliceType ? 'bg-emerald-900/30 text-emerald-400 border-emerald-500/30' : 'bg-blue-900/30 text-blue-400 border-blue-500/30'}`}>
//                                                 {m.meetingType} CASE
//                                             </span>
//                                             {/* Countdown */}
//                                             <div className="flex items-center gap-1.5 bg-black/40 px-2 py-0.5 rounded-full border border-white/10">
//                                                 <FaClock className="text-gray-400 text-[10px]" />
//                                                 <CountdownTimer targetDate={m.startTime} />
//                                             </div>
//                                         </div>

//                                         {/* Title */}
//                                         <h3 className="text-lg md:text-2xl font-bold text-white mb-2 truncate leading-tight">
//                                             {m.title}
//                                         </h3>

//                                         {/* Details Grid - Compact on Mobile */}
//                                         <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs md:text-sm text-gray-400">
//                                             <div className="flex items-center gap-1.5 min-w-[120px]">
//                                                 {isMeHost ? <FaUser className="text-purple-400" /> : <FaUserShield className="text-blue-500" />}
//                                                 <span className="font-medium text-gray-300 truncate max-w-[150px]">
//                                                     {isMeHost 
//                                                         ? (m.participants?.length > 0 ? `${m.participants[0].firstName} ${m.participants.length > 1 ? `+${m.participants.length-1}` : ''}` : "Unknown")
//                                                         : `Host: ${m.host.firstName}`
//                                                     }
//                                                 </span>
//                                             </div>
                                            
//                                             {/* Separator only on Desktop */}
//                                             <div className="w-px h-3 bg-gray-600 hidden md:block"></div>

//                                             <div className="flex items-center gap-1.5">
//                                                 <FaCalendarAlt className="text-amber-500" />
//                                                 <span>{new Date(m.startTime).toLocaleDateString()}</span>
//                                             </div>

//                                             <div className="flex items-center gap-1.5">
//                                                 <FaClock className="text-green-500" />
//                                                 <span>{new Date(m.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Action Button - Full width on Mobile */}
//                                     <button 
//                                         onClick={() => handleJoin(m)}
//                                         className={`w-full md:w-auto px-6 py-2.5 md:py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 text-sm md:text-base 
//                                             ${isPoliceType ? 'bg-gradient-to-r from-emerald-600 to-green-600' : 'bg-gradient-to-r from-blue-600 to-indigo-600'}`}
//                                     >
//                                         <FaVideo className="text-base" />
//                                         <span>{isMeHost ? "Start" : "Join"}</span>
//                                         <FaChevronRight className="text-xs opacity-60" />
//                                     </button>
//                                 </div>
//                             </motion.div>
//                             )
//                         })}
//                     </div>
//                 )}
//             </div>
//         </div>
//     </div>
//   );
// };

// export default MeetingList;













// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { FaVideo, FaCalendarAlt, FaClock, FaUserShield, FaUser, FaLaptop, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
// import { motion } from 'framer-motion';
// import { BASE_URL } from "../../config"; 

// // ✅ IMPORT BACKGROUND
// import dashboardBg from '../../assets/signup-bg.png';

// // --- SUB-COMPONENT: Countdown Timer ---
// const CountdownTimer = ({ targetDate }) => {
//     const [timeLeft, setTimeLeft] = useState("");

//     useEffect(() => {
//         const calculateTime = () => {
//             const now = new Date().getTime();
//             const target = new Date(targetDate).getTime();
//             const diff = target - now;

//             if (diff <= 0) {
//                 setTimeLeft("Started");
//                 return;
//             }

//             const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//             const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//             setTimeLeft(`${minutes}m ${seconds}s`);
//         };

//         calculateTime();
//         const interval = setInterval(calculateTime, 1000);
//         return () => clearInterval(interval);
//     }, [targetDate]);

//     return (
//         <span className="font-mono font-bold text-yellow-400 text-[10px] md:text-xs">
//             {timeLeft === "Started" ? <span className="text-red-500 animate-pulse">LIVE</span> : `in ${timeLeft}`}
//         </span>
//     );
// };

// // --- MAIN COMPONENT ---
// const MeetingList = () => {
//   const [meetings, setMeetings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
//   useEffect(() => {
//     const fetchMeetings = async () => {
//       try {
//         const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//         const { data } = await axios.get(`${BASE_URL}/api/meetings/my-meetings`, config);
        
//         const validMeetings = data.filter(meeting => {
//             if (!meeting.endTime) return true;
//             const endTime = new Date(meeting.endTime).getTime();
//             const now = new Date().getTime();
//             return now <= (endTime + 2 * 60 * 1000);
//         });

//         setMeetings(validMeetings);
//         setLoading(false);
//       } catch (error) { setLoading(false); }
//     };
    
//     fetchMeetings();
//     const interval = setInterval(fetchMeetings, 60000); 
//     return () => clearInterval(interval);

//   }, []);

//   const handleJoin = (meeting) => {
//     navigate(`/meeting/room/${meeting.roomName}`, { 
//       state: { isAdmin: meeting.host._id === userInfo?._id, username: userInfo?.name || "User" } 
//     });
//   };

//   return (
//     <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
        
//         {/* --- BACKGROUND IMAGE --- */}
//         <div className="fixed inset-0 z-0">
//             <img 
//               src={dashboardBg} 
//               alt="Background" 
//               className="fixed inset-0 w-full h-full object-fill opacity-40 z-0" 
//             />
//             <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/95 to-black/90"></div>
//         </div>

//         {/* Scrollable Container */}
//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
            
//             {/* ✅ FIXED HEADER (Sticky & Shifted Up) */}
//             <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-10 py-4 shadow-2xl mb-6">
//                 <div className="max-w-5xl mx-auto flex items-center justify-between">
//                     <div className="flex items-center gap-3 md:gap-4">
//                         <button 
//                             onClick={() => navigate(-1)} 
//                             className="bg-white/5 p-2 md:p-3 rounded-full hover:bg-white/10 transition backdrop-blur-md border border-white/10 hover:border-blue-500/50 group"
//                         >
//                             <FaArrowLeft className="text-sm md:text-base text-gray-300 group-hover:text-white" />
//                         </button>
//                         <div>
//                             <h2 className="text-xl md:text-3xl font-black text-white flex items-center gap-2 tracking-tight">
//                                 <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400"><FaLaptop /></span> 
//                                 Scheduled Meetings
//                             </h2>
//                             <p className="text-gray-400 text-xs md:text-sm font-mono mt-1">Upcoming video sessions & briefings</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* List Content */}
//             <div className="max-w-5xl mx-auto px-4 md:px-10 pb-20">
//                 {loading ? (
//                     <div className="flex flex-col items-center justify-center py-20 opacity-70">
//                        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
//                        <p className="text-indigo-200 text-sm font-mono">SYNCING SECURE SCHEDULE...</p>
//                     </div>
//                 ) : meetings.length === 0 ? (
//                     <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700 border-dashed rounded-3xl p-10 text-center">
//                         <FaCalendarAlt className="text-4xl md:text-6xl text-slate-600 mx-auto mb-4" />
//                         <h3 className="text-lg md:text-xl font-bold text-slate-300">NO MEETINGS SCHEDULED</h3>
//                         <p className="text-gray-500 text-sm mt-2 font-mono">You have no upcoming video inquiries pending.</p>
//                     </div>
//                 ) : (
//                     <div className="grid gap-4 md:gap-6">
//                         {meetings.map((m, index) => {
//                             const isMeHost = m.host._id === userInfo?._id;
//                             const isPoliceType = m.meetingType === 'Police';

//                             return (
//                             <motion.div 
//                                 key={m._id}
//                                 initial={{ opacity: 0, y: 20 }}
//                                 animate={{ opacity: 1, y: 0 }}
//                                 transition={{ delay: index * 0.1 }}
//                                 className={`relative bg-slate-900/60 backdrop-blur-xl border rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]
//                                     p-5 md:p-7 
//                                     ${isPoliceType ? 'border-emerald-500/30 hover:border-emerald-500/60' : 'border-blue-500/30 hover:border-blue-500/60'}`}
//                             >
//                                 {/* Colored Bar */}
//                                 <div className={`absolute top-0 left-0 w-1.5 h-full ${isPoliceType ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>

//                                 <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
                                    
//                                     {/* Info Section */}
//                                     <div className="flex-1 w-full min-w-0 pl-2">
//                                         {/* Badges Row */}
//                                         <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
//                                             <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border shadow-sm ${isPoliceType ? 'bg-emerald-900/40 text-emerald-400 border-emerald-500/30' : 'bg-blue-900/40 text-blue-400 border-blue-500/30'}`}>
//                                                 {m.meetingType} BRIEFING
//                                             </span>
//                                             {/* Countdown */}
//                                             <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 shadow-inner">
//                                                 <FaClock className="text-gray-400 text-[10px]" />
//                                                 <CountdownTimer targetDate={m.startTime} />
//                                             </div>
//                                         </div>

//                                         {/* Title */}
//                                         <h3 className="text-lg md:text-2xl font-bold text-white mb-3 truncate leading-tight group-hover:text-indigo-300 transition-colors">
//                                             {m.title}
//                                         </h3>

//                                         {/* Details Grid */}
//                                         <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-400 font-mono">
//                                             <div className="flex items-center gap-2 min-w-[120px]">
//                                                 {isMeHost ? <FaUser className="text-purple-400" /> : <FaUserShield className="text-blue-500" />}
//                                                 <span className="text-gray-300 truncate max-w-[150px]">
//                                                     {isMeHost 
//                                                         ? (m.participants?.length > 0 ? `${m.participants[0].firstName} ${m.participants.length > 1 ? `+${m.participants.length-1}` : ''}` : "Unknown")
//                                                         : `Host: ${m.host.firstName}`
//                                                     }
//                                                 </span>
//                                             </div>
                                            
//                                             <div className="w-px h-4 bg-slate-700 hidden md:block"></div>

//                                             <div className="flex items-center gap-2">
//                                                 <FaCalendarAlt className="text-amber-500" />
//                                                 <span>{new Date(m.startTime).toLocaleDateString()}</span>
//                                             </div>

//                                             <div className="flex items-center gap-2">
//                                                 <FaClock className="text-green-500" />
//                                                 <span>{new Date(m.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Action Button */}
//                                     <button 
//                                         onClick={() => handleJoin(m)}
//                                         className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 text-sm md:text-base tracking-wide
//                                             ${isPoliceType ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'}`}
//                                     >
//                                         <FaVideo />
//                                         <span>{isMeHost ? "START SESSION" : "JOIN NOW"}</span>
//                                         <FaChevronRight className="text-xs opacity-70" />
//                                     </button>
//                                 </div>
//                             </motion.div>
//                             )
//                         })}
//                     </div>
//                 )}
//             </div>
//         </div>
//     </div>
//   );
// };

// export default MeetingList;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaVideo, FaCalendarAlt, FaClock, FaUserShield, FaUser, FaLaptop, FaChevronRight, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { BASE_URL } from "../../config"; 

// ✅ REVERTED TO YOUR ORIGINAL BACKGROUND LOGIC
const bgImage = "https://res.cloudinary.com/dukrcgv8s/image/upload/v1770326291/ChatGPT_Image_Feb_6_2026_02_04_23_AM_zkg6x7.png";

// --- SUB-COMPONENT: Countdown Timer ---
const CountdownTimer = ({ targetDate }) => {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const calculateTime = () => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft("Started");
                return;
            }

            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft(`${minutes}m ${seconds}s`);
        };

        calculateTime();
        const interval = setInterval(calculateTime, 1000);
        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <span className="font-mono font-bold text-yellow-400 text-[10px] md:text-xs">
            {timeLeft === "Started" ? <span className="text-red-500 animate-pulse">LIVE</span> : `in ${timeLeft}`}
        </span>
    );
};

// --- MAIN COMPONENT ---
const MeetingList = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
        const { data } = await axios.get(`${BASE_URL}/api/meetings/my-meetings`, config);
        
        const validMeetings = data.filter(meeting => {
            if (!meeting.endTime) return true;
            const endTime = new Date(meeting.endTime).getTime();
            const now = new Date().getTime();
            return now <= (endTime + 2 * 60 * 1000);
        });

        setMeetings(validMeetings);
        setLoading(false);
      } catch (error) { setLoading(false); }
    };
    
    fetchMeetings();
    const interval = setInterval(fetchMeetings, 60000); 
    return () => clearInterval(interval);

  }, []);

  const handleJoin = (meeting) => {
    navigate(`/meeting/room/${meeting.roomName}`, { 
      state: { isAdmin: meeting.host._id === userInfo?._id, username: userInfo?.name || "User" } 
    });
  };

  return (
    <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
        
        {/* --- BACKGROUND IMAGE (Original Restored) --- */}
        <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.2) blur(3px)" }} />

        {/* Scrollable Container */}
        <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
            
            {/* ✅ FIXED HEADER (Sticky & Shifted Up) */}
            <div className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 md:px-10 py-4 shadow-2xl mb-6">
                <div className="max-w-5xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                        <button 
                            onClick={() => navigate(-1)} 
                            className="bg-white/5 p-2 md:p-3 rounded-full hover:bg-white/10 transition backdrop-blur-md border border-white/10 hover:border-blue-500/50 group"
                        >
                            <FaArrowLeft className="text-sm md:text-base text-gray-300 group-hover:text-white" />
                        </button>
                        <div>
                            <h2 className="text-xl md:text-3xl font-black text-white flex items-center gap-2 tracking-tight">
                                <span className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400"><FaLaptop /></span> 
                                Scheduled Meetings
                            </h2>
                            <p className="text-gray-400 text-xs md:text-sm font-mono mt-1">Upcoming video sessions & briefings</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-10 pb-20">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 opacity-70">
                       <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
                       <p className="text-indigo-200 text-sm font-mono">SYNCING SECURE SCHEDULE...</p>
                    </div>
                ) : meetings.length === 0 ? (
                    <div className="bg-slate-800/30 backdrop-blur-md border border-slate-700 border-dashed rounded-3xl p-10 text-center">
                        <FaCalendarAlt className="text-4xl md:text-6xl text-slate-600 mx-auto mb-4" />
                        <h3 className="text-lg md:text-xl font-bold text-slate-300">NO MEETINGS SCHEDULED</h3>
                        <p className="text-gray-500 text-sm mt-2 font-mono">You have no upcoming video inquiries pending.</p>
                    </div>
                ) : (
                    <div className="grid gap-4 md:gap-6">
                        {meetings.map((m, index) => {
                            const isMeHost = m.host._id === userInfo?._id;
                            const isPoliceType = m.meetingType === 'Police';

                            return (
                            <motion.div 
                                key={m._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative bg-slate-900/60 backdrop-blur-xl border rounded-2xl shadow-xl overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]
                                    p-5 md:p-7 
                                    ${isPoliceType ? 'border-emerald-500/30 hover:border-emerald-500/60' : 'border-blue-500/30 hover:border-blue-500/60'}`}
                            >
                                {/* Colored Bar */}
                                <div className={`absolute top-0 left-0 w-1.5 h-full ${isPoliceType ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>

                                <div className="flex flex-col md:flex-row md:items-center gap-5 justify-between">
                                    
                                    {/* Info Section */}
                                    <div className="flex-1 w-full min-w-0 pl-2">
                                        {/* Badges Row */}
                                        <div className="flex items-center justify-between md:justify-start gap-3 mb-2">
                                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider border shadow-sm ${isPoliceType ? 'bg-emerald-900/40 text-emerald-400 border-emerald-500/30' : 'bg-blue-900/40 text-blue-400 border-blue-500/30'}`}>
                                                {m.meetingType} BRIEFING
                                            </span>
                                            {/* Countdown */}
                                            <div className="flex items-center gap-2 bg-black/40 px-3 py-1 rounded-full border border-white/10 shadow-inner">
                                                <FaClock className="text-gray-400 text-[10px]" />
                                                <CountdownTimer targetDate={m.startTime} />
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg md:text-2xl font-bold text-white mb-3 truncate leading-tight group-hover:text-indigo-300 transition-colors">
                                            {m.title}
                                        </h3>

                                        {/* Details Grid */}
                                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm text-gray-400 font-mono">
                                            <div className="flex items-center gap-2 min-w-[120px]">
                                                {isMeHost ? <FaUser className="text-purple-400" /> : <FaUserShield className="text-blue-500" />}
                                                <span className="text-gray-300 truncate max-w-[150px]">
                                                    {isMeHost 
                                                        ? (m.participants?.length > 0 ? `${m.participants[0].firstName} ${m.participants.length > 1 ? `+${m.participants.length-1}` : ''}` : "Unknown")
                                                        : `Host: ${m.host.firstName}`
                                                    }
                                                </span>
                                            </div>
                                            
                                            <div className="w-px h-4 bg-slate-700 hidden md:block"></div>

                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-amber-500" />
                                                <span>{new Date(m.startTime).toLocaleDateString()}</span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <FaClock className="text-green-500" />
                                                <span>{new Date(m.startTime).toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button 
                                        onClick={() => handleJoin(m)}
                                        className={`w-full md:w-auto px-8 py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 text-sm md:text-base tracking-wide
                                            ${isPoliceType ? 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'}`}
                                    >
                                        <FaVideo />
                                        <span>{isMeHost ? "START SESSION" : "JOIN NOW"}</span>
                                        <FaChevronRight className="text-xs opacity-70" />
                                    </button>
                                </div>
                            </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default MeetingList;