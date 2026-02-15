// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
// import api from '../../api/axios'; // Your custom axios
// import { toast } from 'react-hot-toast';

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // Detect Type based on URL path
//   const type = location.pathname.includes('citizen') ? 'citizen' : 'police';
  
//   // Pre-fill data if coming from Case File
//   const prefillName = searchParams.get('name') || '';
//   const prefillId = searchParams.get('id') || '';

//   const [formData, setFormData] = useState({
//     title: '',
//     date: '',
//     time: '',
//     participantId: prefillId, // For Citizen
//     selectedOfficers: [] // For Police
//   });

//   const [officers, setOfficers] = useState([]);
//   const [citizens, setCitizens] = useState([]);

//   useEffect(() => {
//     // Fetch users based on type
//     const fetchData = async () => {
//       try {
//         if (type === 'police') {
//           const { data } = await api.get('/api/users/officers');
//           setOfficers(data);
//         } else {
//           // Ideally fetch citizens associated with cases, fetching all for demo
//           const { data } = await api.get('/api/users?role=citizen');
//           setCitizens(data);
//         }
//       } catch (error) {
//         console.error("Error fetching users");
//       }
//     };
//     fetchData();
//   }, [type]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const scheduledTime = new Date(`${formData.date}T${formData.time}`);
      
//       const payload = {
//         title: formData.title,
//         meetingType: type,
//         scheduledTime: scheduledTime,
//         participantIds: type === 'police' ? formData.selectedOfficers : [formData.participantId],
//         citizenName: type === 'citizen' ? citizens.find(c => c._id === formData.participantId)?.name : ''
//       };

//       await api.post('/api/meetings/schedule', payload);
//       toast.success('Meeting Scheduled Successfully!');
//       navigate('/police/meeting/list'); // Redirect to list
//     } catch (error) {
//       toast.error('Failed to schedule meeting');
//     }
//   };

//   return (
//     <div className="p-8 max-w-2xl mx-auto text-white">
//       <h2 className="text-2xl font-bold mb-6 text-cyan-400">Schedule {type === 'citizen' ? 'Citizen' : 'Police'} Meeting</h2>
//       <form onSubmit={handleSubmit} className="bg-slate-800 p-6 rounded-xl space-y-4 border border-slate-700">
        
//         <div>
//           <label className="block text-sm font-bold mb-1">Meeting Title / Topic</label>
//           <input type="text" className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white" 
//             value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
//         </div>

//         {type === 'citizen' ? (
//           <div>
//             <label className="block text-sm font-bold mb-1">Select Citizen</label>
//             <select className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white"
//               value={formData.participantId} onChange={e => setFormData({...formData, participantId: e.target.value})} required>
//               <option value="">-- Select Citizen --</option>
//               {citizens.map(c => (
//                 <option key={c._id} value={c._id}>{c.firstName} {c.lastName} ({c.mobile})</option>
//               ))}
//             </select>
//           </div>
//         ) : (
//           <div>
//             <label className="block text-sm font-bold mb-1">Select Officers (Hold Ctrl to select multiple)</label>
//             <select multiple className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white h-32"
//               onChange={e => {
//                 const selected = Array.from(e.target.selectedOptions, option => option.value);
//                 setFormData({...formData, selectedOfficers: selected});
//               }}>
//               {officers.map(off => (
//                 <option key={off._id} value={off._id}>{off.designation} {off.firstName} {off.lastName}</option>
//               ))}
//             </select>
//           </div>
//         )}

//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-bold mb-1">Date</label>
//             <input type="date" className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white"
//               value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} required />
//           </div>
//           <div>
//             <label className="block text-sm font-bold mb-1">Time</label>
//             <input type="time" className="w-full bg-slate-900 border border-slate-600 rounded p-2 text-white"
//               value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} required />
//           </div>
//         </div>

//         <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 py-2 rounded font-bold mt-4">Schedule Meeting</button>
//       </form>
//     </div>
//   );
// };

// export default ScheduleMeeting;












// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../../api/axios";
// import { toast } from "react-hot-toast";
// import { FaUser, FaClock, FaVideo, FaCalendarTimes } from "react-icons/fa"; // ✅ New Icon

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     title: "",
//     startTime: "",
//     endTime: "", // ✅ New State
//     participantId: searchParams.get("id") || "",
//     participantName: searchParams.get("name") || "",
//     meetingType: "Citizen" 
//   });

//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const { data } = await api.get(`/api/users?role=citizen`);
//             setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users");
//         }
//     };
//     fetchUsers();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // ✅ Validation: End Time must be after Start Time
//     if (new Date(formData.endTime) <= new Date(formData.startTime)) {
//         return toast.error("End time must be after Start time");
//     }

//     try {
//       await api.post("/api/meetings/schedule", {
//         ...formData,
//         scheduledTime: formData.startTime // Backend compatibility ke liye
//       });
//       toast.success("Meeting Scheduled Successfully!");
//       navigate(-1);
//     } catch (error) {
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="p-4 md:p-10 max-w-4xl mx-auto text-white">
//       <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
//         <FaVideo className="text-blue-500"/> Schedule Video Inquiry
//       </h2>

//       <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl space-y-6">
        
//         {/* Title */}
//         <div>
//             <label className="block text-gray-400 mb-2 font-bold">Inquiry Title / Subject</label>
//             <input 
//               type="text" 
//               required
//               className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none text-white"
//               placeholder="e.g. Statement regarding Case #1234"
//               value={formData.title} 
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//             />
//         </div>

//         {/* Start & End Time Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Start Time */}
//             <div>
//                 <label className="block text-gray-400 mb-2 font-bold flex items-center gap-2">
//                     <FaClock /> Start Time
//                 </label>
//                 <input 
//                   type="datetime-local" 
//                   required
//                   className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none text-white"
//                   value={formData.startTime} 
//                   onChange={(e) => setFormData({...formData, startTime: e.target.value})}
//                 />
//             </div>

//             {/* ✅ End Time Input */}
//             <div>
//                 <label className="block text-gray-400 mb-2 font-bold flex items-center gap-2">
//                     <FaCalendarTimes /> End Time
//                 </label>
//                 <input 
//                   type="datetime-local" 
//                   required
//                   className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:border-red-500 outline-none text-white"
//                   value={formData.endTime} 
//                   onChange={(e) => setFormData({...formData, endTime: e.target.value})}
//                 />
//             </div>
//         </div>

//         {/* Select Citizen */}
//         <div>
//             <label className="block text-gray-400 mb-2 font-bold flex items-center gap-2">
//                 <FaUser /> Select Citizen
//             </label>
//             <select 
//               className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none text-white"
//               value={formData.participantId}
//               onChange={(e) => setFormData({...formData, participantId: e.target.value})}
//               required
//             >
//                 <option value="">-- Choose Citizen --</option>
//                 {users.map(u => (
//                     <option key={u._id} value={u._id}>{u.firstName} {u.lastName} (ID: {u._id.slice(-4)})</option>
//                 ))}
//             </select>
//         </div>

//         <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-bold text-lg shadow-lg transition-all mt-4">
//             Confirm Schedule
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ScheduleMeeting;












// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../../api/axios";
// import { toast } from "react-hot-toast";
// import { FaUser, FaClock, FaVideo, FaCalendarTimes, FaUserShield, FaCheckSquare, FaSquare } from "react-icons/fa";

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");

//   const [formData, setFormData] = useState({
//     title: "",
//     startTime: "",
//     endTime: "",
//     meetingType: isPoliceMeeting ? "Police" : "Citizen"
//   });

//   // ✅ New State for Multiple Selection
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   // Pre-select if ID comes from URL (e.g. scheduling from profile)
//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const roleQuery = isPoliceMeeting ? "police" : "citizen";
//             const { data } = await api.get(`/api/users?role=${roleQuery}`);
//             setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users");
//         }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   // ✅ Handle Individual Checkbox
//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) {
//         setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     } else {
//         setSelectedUsers([...selectedUsers, userId]);
//     }
//   };

//   // ✅ Handle Select All
//   const toggleSelectAll = () => {
//     if (selectedUsers.length === users.length) {
//         setSelectedUsers([]); // Deselect All
//     } else {
//         setSelectedUsers(users.map(u => u._id)); // Select All
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (new Date(formData.endTime) <= new Date(formData.startTime)) {
//         return toast.error("End time must be after Start time");
//     }

//     if (selectedUsers.length === 0) {
//         return toast.error("Please select at least one participant");
//     }

//     try {
//       await api.post("/api/meetings/schedule", {
//         ...formData,
//         scheduledTime: formData.startTime,
//         participants: selectedUsers // ✅ Sending Array
//       });
//       toast.success(isPoliceMeeting ? "Internal Briefing Scheduled!" : "Citizen Inquiry Scheduled!");
//       navigate(-1);
//     } catch (error) {
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="p-4 md:p-10 max-w-4xl mx-auto text-white">
//       <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${isPoliceMeeting ? "text-emerald-400" : "text-blue-400"}`}>
//         {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
//         {isPoliceMeeting ? "Schedule Internal Briefing" : "Schedule Citizen Inquiry"}
//       </h2>

//       <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl space-y-6">
        
//         {/* Title */}
//         <div>
//             <label className="block text-gray-400 mb-2 font-bold">Meeting Subject</label>
//             <input 
//               type="text" 
//               required
//               className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none text-white"
//               placeholder="e.g. Urgent Case Discussion"
//               value={formData.title} 
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//             />
//         </div>

//         {/* Time Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//                 <label className="block text-gray-400 mb-2 font-bold flex items-center gap-2"><FaClock /> Start Time</label>
//                 <input type="datetime-local" required className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white"
//                   value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} />
//             </div>
//             <div>
//                 <label className="block text-gray-400 mb-2 font-bold flex items-center gap-2"><FaCalendarTimes /> End Time</label>
//                 <input type="datetime-local" required className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white"
//                   value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} />
//             </div>
//         </div>

//         {/* ✅ Multi-Select UI */}
//         <div>
//             <div className="flex justify-between items-center mb-2">
//                 <label className="text-gray-400 font-bold flex items-center gap-2">
//                     {isPoliceMeeting ? <FaUserShield /> : <FaUser />} Select Participants ({selectedUsers.length})
//                 </label>
                
//                 {/* Select All Button */}
//                 <button 
//                     type="button" 
//                     onClick={toggleSelectAll}
//                     className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
//                 >
//                     {selectedUsers.length === users.length ? <FaCheckSquare /> : <FaSquare />} 
//                     {selectedUsers.length === users.length ? "Deselect All" : "Select All"}
//                 </button>
//             </div>

//             <div className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 max-h-60 overflow-y-auto custom-scrollbar">
//                 {users.length > 0 ? (
//                     users.map(u => {
//                         const isSelected = selectedUsers.includes(u._id);
//                         return (
//                             <div 
//                                 key={u._id} 
//                                 onClick={() => toggleUser(u._id)}
//                                 className={`flex items-center justify-between p-3 rounded mb-2 cursor-pointer transition-all border ${isSelected ? 'bg-blue-900/30 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
//                                         {isSelected && <FaCheckSquare className="text-white text-xs" />}
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-sm text-white">{u.firstName} {u.lastName}</p>
//                                         <p className="text-xs text-gray-400">{isPoliceMeeting ? u.designation || 'Officer' : `ID: ${u._id.slice(-4)}`}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 ) : (
//                     <p className="text-gray-500 text-center">No users found.</p>
//                 )}
//             </div>
//         </div>

//         <button type="submit" className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all mt-4 ${isPoliceMeeting ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-500"}`}>
//             {isPoliceMeeting ? "Schedule Briefing" : "Schedule Inquiry"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ScheduleMeeting;












// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../../api/axios";
// import { toast } from "react-hot-toast";
// import { FaUser, FaClock, FaVideo, FaCalendarTimes, FaUserShield, FaCheckSquare, FaSquare } from "react-icons/fa";

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");

//   const [formData, setFormData] = useState({
//     title: "",
//     startTime: "",
//     endTime: "",
//     meetingType: isPoliceMeeting ? "Police" : "Citizen"
//   });

//   // ✅ New State for Multiple Selection
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   // Pre-select if ID comes from URL (e.g. scheduling from profile)
//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             // ✅ FIX APPLIED HERE: Fetch both 'police' and 'senior' for internal meetings
//             const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
            
//             const { data } = await api.get(`/api/users?role=${roleQuery}`);
//             setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users");
//         }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   // ✅ Handle Individual Checkbox
//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) {
//         setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     } else {
//         setSelectedUsers([...selectedUsers, userId]);
//     }
//   };

//   // ✅ Handle Select All
//   const toggleSelectAll = () => {
//     if (selectedUsers.length === users.length) {
//         setSelectedUsers([]); // Deselect All
//     } else {
//         setSelectedUsers(users.map(u => u._id)); // Select All
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (new Date(formData.endTime) <= new Date(formData.startTime)) {
//         return toast.error("End time must be after Start time");
//     }

//     if (selectedUsers.length === 0) {
//         return toast.error("Please select at least one participant");
//     }

//     try {
//       await api.post("/api/meetings/schedule", {
//         ...formData,
//         scheduledTime: formData.startTime,
//         participants: selectedUsers // ✅ Sending Array
//       });
//       toast.success(isPoliceMeeting ? "Internal Briefing Scheduled!" : "Citizen Inquiry Scheduled!");
//       navigate(-1);
//     } catch (error) {
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="p-4 md:p-10 max-w-4xl mx-auto text-white">
//       <h2 className={`text-3xl font-bold mb-6 flex items-center gap-3 ${isPoliceMeeting ? "text-emerald-400" : "text-blue-400"}`}>
//         {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
//         {isPoliceMeeting ? "Schedule Internal Briefing" : "Schedule Citizen Inquiry"}
//       </h2>

//       <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl border border-gray-700 shadow-2xl space-y-6">
        
//         {/* Title */}
//         <div>
//             <label className="block text-gray-400 mb-2 font-bold">Meeting Subject</label>
//             <input 
//               type="text" 
//               required
//               className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 focus:border-blue-500 outline-none text-white"
//               placeholder="e.g. Urgent Case Discussion"
//               value={formData.title} 
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//             />
//         </div>

//         {/* Time Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//                 <label className="block text-gray-400 mb-2 font-bold flex items-center gap-2"><FaClock /> Start Time</label>
//                 <input type="datetime-local" required className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white"
//                   value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} />
//             </div>
//             <div>
//                 <label className="block text-gray-400 mb-2 font-bold flex items-center gap-2"><FaCalendarTimes /> End Time</label>
//                 <input type="datetime-local" required className="w-full bg-gray-900 border border-gray-600 rounded-lg p-3 text-white"
//                   value={formData.endTime} onChange={(e) => setFormData({...formData, endTime: e.target.value})} />
//             </div>
//         </div>

//         {/* ✅ Multi-Select UI */}
//         <div>
//             <div className="flex justify-between items-center mb-2">
//                 <label className="text-gray-400 font-bold flex items-center gap-2">
//                     {isPoliceMeeting ? <FaUserShield /> : <FaUser />} Select Participants ({selectedUsers.length})
//                 </label>
                
//                 {/* Select All Button */}
//                 <button 
//                     type="button" 
//                     onClick={toggleSelectAll}
//                     className="text-sm font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
//                 >
//                     {selectedUsers.length === users.length ? <FaCheckSquare /> : <FaSquare />} 
//                     {selectedUsers.length === users.length ? "Deselect All" : "Select All"}
//                 </button>
//             </div>

//             <div className="w-full bg-gray-900 border border-gray-600 rounded-lg p-4 max-h-60 overflow-y-auto custom-scrollbar">
//                 {users.length > 0 ? (
//                     users.map(u => {
//                         const isSelected = selectedUsers.includes(u._id);
//                         return (
//                             <div 
//                                 key={u._id} 
//                                 onClick={() => toggleUser(u._id)}
//                                 className={`flex items-center justify-between p-3 rounded mb-2 cursor-pointer transition-all border ${isSelected ? 'bg-blue-900/30 border-blue-500' : 'bg-gray-800 border-gray-700 hover:bg-gray-700'}`}
//                             >
//                                 <div className="flex items-center gap-3">
//                                     <div className={`w-5 h-5 rounded flex items-center justify-center border ${isSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-500'}`}>
//                                         {isSelected && <FaCheckSquare className="text-white text-xs" />}
//                                     </div>
//                                     <div>
//                                         <p className="font-bold text-sm text-white">{u.firstName} {u.lastName}</p>
//                                         <p className="text-xs text-gray-400">{isPoliceMeeting ? u.designation || 'Officer' : `ID: ${u._id.slice(-4)}`}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         )
//                     })
//                 ) : (
//                     <p className="text-gray-500 text-center">No users found.</p>
//                 )}
//             </div>
//         </div>

//         <button type="submit" className={`w-full py-3 rounded-lg font-bold text-lg shadow-lg transition-all mt-4 ${isPoliceMeeting ? "bg-emerald-600 hover:bg-emerald-500" : "bg-blue-600 hover:bg-blue-500"}`}>
//             {isPoliceMeeting ? "Schedule Briefing" : "Schedule Inquiry"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ScheduleMeeting;























// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../../api/axios";
// import { toast } from "react-hot-toast";
// import { 
//     FaUser, FaVideo, FaUserShield, FaCheckCircle, 
//     FaArrowLeft, FaCalendarAlt, FaClock, FaShieldAlt 
// } from "react-icons/fa";

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");
//   const bgImage = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop";

//   // --- Date/Time Selection State ---
//   // Using strings for dropdown values
//   const [date, setDate] = useState({ day: "", month: "", year: "2026" });
//   const [time, setTime] = useState({ hour: "", minute: "00", ampm: "AM" });
//   const [duration, setDuration] = useState("30"); // Default 30 mins duration

//   const [title, setTitle] = useState(searchParams.get("title") || "");
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   // Generate Dropdown Options
//   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const years = ["2026", "2027", "2028"];
//   const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const minutes = ["00", "15", "30", "45"];

//   // Pre-select user from URL
//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   // Fetch Users
//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
//             const { data } = await api.get(`/api/users?role=${roleQuery}`);
//             setUsers(data);
//         } catch (error) { console.error("Error fetching users"); }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     else setSelectedUsers([...selectedUsers, userId]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // 1. Validate Fields
//     if (!title || !date.day || !date.month || !time.hour) {
//         return toast.error("Please fill all meeting details.");
//     }
//     if (selectedUsers.length === 0) {
//         return toast.error("Select at least one participant.");
//     }

//     // 2. Construct Date Objects
//     const monthIndex = months.indexOf(date.month);
//     let hour24 = parseInt(time.hour);
//     if (time.ampm === "PM" && hour24 !== 12) hour24 += 12;
//     if (time.ampm === "AM" && hour24 === 12) hour24 = 0;

//     const startDateTime = new Date(parseInt(date.year), monthIndex, parseInt(date.day), hour24, parseInt(time.minute));
    
//     // End Time = Start + Duration
//     const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

//     // Validate Future Date
//     if (startDateTime < new Date()) return toast.error("Meeting time cannot be in the past.");

//     try {
//       await api.post("/api/meetings/schedule", {
//         title,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         meetingType: isPoliceMeeting ? "Police" : "Citizen",
//         participants: selectedUsers
//       });
//       toast.success("Meeting Scheduled Successfully!");
//       navigate(-1);
//     } catch (error) {
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans overflow-y-auto">
//         {/* Background */}
//         <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.2) blur(3px)" }} />

//         <div className="relative z-10 max-w-6xl mx-auto p-4 md:p-10">
            
//             {/* --- HEADER --- */}
//             <div className="flex items-center gap-4 mb-8">
//                 <button onClick={() => navigate(-1)} className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md">
//                     <FaArrowLeft />
//                 </button>
//                 <div>
//                     <h2 className="text-3xl font-bold flex items-center gap-3">
//                         {isPoliceMeeting ? <FaUserShield className="text-emerald-400" /> : <FaVideo className="text-blue-400" />} 
//                         {isPoliceMeeting ? "Internal Police Briefing" : "Citizen Video Inquiry"}
//                     </h2>
//                     <p className="text-gray-400 text-sm mt-1">Configure schedule and select participants</p>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
//                 {/* --- LEFT COLUMN: MEETING DETAILS --- */}
//                 <div className="lg:col-span-1 space-y-6">
//                     <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl">
//                         <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Session Details</h3>
                        
//                         {/* Title */}
//                         <div className="mb-6">
//                             <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Meeting Title</label>
//                             <input 
//                                 type="text" 
//                                 className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-white focus:border-blue-500 outline-none transition-colors"
//                                 placeholder="e.g. Case #1234 Review"
//                                 value={title}
//                                 onChange={(e) => setTitle(e.target.value)}
//                             />
//                         </div>

//                         {/* Date Dropdowns */}
//                         <div className="mb-6">
//                             <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaCalendarAlt /> Date</label>
//                             <div className="grid grid-cols-3 gap-2">
//                                 <select value={date.day} onChange={(e) => setDate({...date, day: e.target.value})} className="bg-black/40 border border-white/20 rounded-lg p-2 text-sm outline-none focus:border-blue-500">
//                                     <option value="">Day</option>
//                                     {days.map(d => <option key={d} value={d}>{d}</option>)}
//                                 </select>
//                                 <select value={date.month} onChange={(e) => setDate({...date, month: e.target.value})} className="bg-black/40 border border-white/20 rounded-lg p-2 text-sm outline-none focus:border-blue-500">
//                                     <option value="">Month</option>
//                                     {months.map(m => <option key={m} value={m}>{m}</option>)}
//                                 </select>
//                                 <select value={date.year} onChange={(e) => setDate({...date, year: e.target.value})} className="bg-black/40 border border-white/20 rounded-lg p-2 text-sm outline-none focus:border-blue-500">
//                                     {years.map(y => <option key={y} value={y}>{y}</option>)}
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Time Dropdowns */}
//                         <div className="mb-6">
//                             <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaClock /> Time</label>
//                             <div className="grid grid-cols-3 gap-2">
//                                 <select value={time.hour} onChange={(e) => setTime({...time, hour: e.target.value})} className="bg-black/40 border border-white/20 rounded-lg p-2 text-sm outline-none focus:border-blue-500">
//                                     <option value="">Hr</option>
//                                     {hours.map(h => <option key={h} value={h}>{h}</option>)}
//                                 </select>
//                                 <select value={time.minute} onChange={(e) => setTime({...time, minute: e.target.value})} className="bg-black/40 border border-white/20 rounded-lg p-2 text-sm outline-none focus:border-blue-500">
//                                     {minutes.map(m => <option key={m} value={m}>{m}</option>)}
//                                 </select>
//                                 <select value={time.ampm} onChange={(e) => setTime({...time, ampm: e.target.value})} className="bg-black/40 border border-white/20 rounded-lg p-2 text-sm outline-none focus:border-blue-500">
//                                     <option value="AM">AM</option>
//                                     <option value="PM">PM</option>
//                                 </select>
//                             </div>
//                         </div>

//                         {/* Duration */}
//                         <div className="mb-6">
//                             <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Duration (Minutes)</label>
//                             <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-black/40 border border-white/20 rounded-lg p-3 text-sm outline-none focus:border-blue-500">
//                                 <option value="15">15 Minutes</option>
//                                 <option value="30">30 Minutes</option>
//                                 <option value="45">45 Minutes</option>
//                                 <option value="60">1 Hour</option>
//                             </select>
//                         </div>

//                         <button type="submit" className={`w-full py-4 rounded-xl font-bold text-lg shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all transform hover:scale-[1.02] ${isPoliceMeeting ? "bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400" : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400"}`}>
//                             SCHEDULE MEETING
//                         </button>
//                     </div>
//                 </div>

//                 {/* --- RIGHT COLUMN: PARTICIPANT GRID --- */}
//                 <div className="lg:col-span-2">
//                     <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl h-full flex flex-col">
//                         <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10">
//                             <h3 className="text-lg font-bold text-white flex items-center gap-2">
//                                 <FaUser /> Select Participants <span className="bg-white/10 px-2 py-0.5 rounded text-sm">{selectedUsers.length}</span>
//                             </h3>
//                             <button type="button" onClick={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))} className="text-xs font-bold text-blue-400 hover:text-white transition">
//                                 {selectedUsers.length === users.length ? "DESELECT ALL" : "SELECT ALL"}
//                             </button>
//                         </div>

//                         <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh]">
//                             {users.length > 0 ? (
//                                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                     {users.map(u => {
//                                         const isSelected = selectedUsers.includes(u._id);
//                                         return (
//                                             <div 
//                                                 key={u._id} 
//                                                 onClick={() => toggleUser(u._id)}
//                                                 className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 group ${isSelected 
//                                                     ? (isPoliceMeeting ? 'bg-emerald-900/20 border-emerald-500' : 'bg-blue-900/20 border-blue-500') 
//                                                     : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20'}`}
//                                             >
//                                                 <div className="flex items-center gap-4">
//                                                     {/* Profile Avatar */}
//                                                     <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${isSelected ? (isPoliceMeeting ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white') : 'bg-slate-700 text-gray-400'}`}>
//                                                         {u.firstName?.[0]}
//                                                     </div>
                                                    
//                                                     <div className="min-w-0">
//                                                         <h4 className={`font-bold text-base truncate ${isSelected ? 'text-white' : 'text-gray-300'}`}>{u.firstName} {u.lastName}</h4>
//                                                         <p className="text-xs text-gray-400 truncate">
//                                                             {isPoliceMeeting ? (u.designation || 'Officer') : `ID: ${u._id.slice(-6).toUpperCase()}`}
//                                                         </p>
//                                                         {isPoliceMeeting && <p className="text-[10px] text-gray-500 truncate">{u.station}</p>}
//                                                     </div>
//                                                 </div>

//                                                 {/* Checkmark Overlay */}
//                                                 {isSelected && (
//                                                     <div className={`absolute top-3 right-3 text-lg ${isPoliceMeeting ? 'text-emerald-400' : 'text-blue-400'}`}>
//                                                         <FaCheckCircle />
//                                                     </div>
//                                                 )}
//                                             </div>
//                                         )
//                                     })}
//                                 </div>
//                             ) : (
//                                 <div className="text-center py-20 text-gray-500">No available users found for this category.</div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//             </form>
//         </div>
//     </div>
//   );
// };

// export default ScheduleMeeting;






// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import api from "../../api/axios";
// import { toast } from "react-hot-toast";
// import { 
//     FaUser, FaVideo, FaUserShield, FaCheckCircle, 
//     FaArrowLeft, FaCalendarAlt, FaClock 
// } from "react-icons/fa";

// // Helper for Image URL
// const BASE_URL = "https://crimetrack-api.onrender.com"; 
// const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");


//   const bgImage = isPoliceMeeting 
//     ? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" // Police Theme
//     : "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000"; // Citizen Theme (Your Link)

//   // Color Palettes
//   const theme = isPoliceMeeting ? {
//       gradient: "from-emerald-600 to-teal-500",
//       hover: "hover:from-emerald-500 hover:to-teal-400",
//       border: "border-emerald-500",
//       text: "text-emerald-400",
//       shadow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
//       cardSelected: "bg-emerald-900/40 border-emerald-500",
//       iconBg: "bg-emerald-500/20"
//   } : {
//       gradient: "from-violet-600 to-fuchsia-500",
//       hover: "hover:from-violet-500 hover:to-fuchsia-400",
//       border: "border-fuchsia-500",
//       text: "text-fuchsia-400",
//       shadow: "hover:shadow-[0_0_20px_rgba(192,38,211,0.4)]",
//       cardSelected: "bg-fuchsia-900/40 border-fuchsia-500",
//       iconBg: "bg-fuchsia-500/20"
//   };

//   // State
//   const [date, setDate] = useState({ day: "", month: "", year: "2026" });
//   const [time, setTime] = useState({ hour: "", minute: "00", ampm: "AM" });
//   const [duration, setDuration] = useState("30");
//   const [title, setTitle] = useState(searchParams.get("title") || "");
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   // Dropdown Data
//   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const years = ["2026", "2027", "2028"];
//   const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const minutes = ["00", "15", "30", "45"];

//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
//             const { data } = await api.get(`/api/users?role=${roleQuery}`);
//             setUsers(data);
//         } catch (error) { console.error("Error fetching users"); }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     else setSelectedUsers([...selectedUsers, userId]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!title || !date.day || !date.month || !time.hour) return toast.error("Please fill all details.");
//     if (selectedUsers.length === 0) return toast.error("Select at least one participant.");

//     const monthIndex = months.indexOf(date.month);
//     let hour24 = parseInt(time.hour);
//     if (time.ampm === "PM" && hour24 !== 12) hour24 += 12;
//     if (time.ampm === "AM" && hour24 === 12) hour24 = 0;

//     const startDateTime = new Date(parseInt(date.year), monthIndex, parseInt(date.day), hour24, parseInt(time.minute));
//     const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

//     if (startDateTime < new Date()) return toast.error("Meeting time cannot be in the past.");

//     try {
//       await api.post("/api/meetings/schedule", {
//         title,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         meetingType: isPoliceMeeting ? "Police" : "Citizen",
//         participants: selectedUsers
//       });
//       toast.success("Meeting Scheduled!");
//       navigate(-1);
//     } catch (error) {
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     // Fixed Height Container
//     <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
        
//         {/* Background Image */}
//         <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4) blur(4px)" }} />

//         {/* Scrollable Content */}
//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-4 md:p-10">
//             <div className="max-w-6xl mx-auto">
                
//                 {/* --- HEADER --- */}
//                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
//                     <button onClick={() => navigate(-1)} className="bg-white/10 w-fit p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md border border-white/10 group">
//                         <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//                     </button>
//                     <div>
//                         <h2 className={`text-2xl md:text-3xl font-bold flex items-center gap-3 ${theme.text}`}>
//                             {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
//                             {isPoliceMeeting ? "Internal Police Briefing" : "Citizen Video Inquiry"}
//                         </h2>
//                         <p className="text-gray-300 text-sm mt-1 opacity-80">Configure schedule parameters and select participants</p>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
                    
//                     {/* --- LEFT: FORM DETAILS --- */}
//                     <div className="lg:col-span-1 space-y-6">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
//                             <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
//                                 <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${theme.gradient}`}></span>
//                                 Session Details
//                             </h3>
                            
//                             {/* Title */}
//                             <div className="mb-6 group">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 group-focus-within:text-white transition-colors">Meeting Title</label>
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all"
//                                     placeholder="e.g. Urgent Case Review"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>

//                             {/* Date */}
//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaCalendarAlt className={theme.text} /> Date</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     {/* Styled Selects */}
//                                     {[
//                                         { val: date.day, set: (v)=>setDate({...date, day:v}), opts: days, ph: "Day" },
//                                         { val: date.month, set: (v)=>setDate({...date, month:v}), opts: months, ph: "Month" },
//                                         { val: date.year, set: (v)=>setDate({...date, year:v}), opts: years, ph: "Year" }
//                                     ].map((field, idx) => (
//                                         <div key={idx} className="relative">
//                                             <select value={field.val} onChange={(e)=>field.set(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-sm outline-none focus:border-white/40 appearance-none text-center cursor-pointer hover:bg-white/5 transition-colors">
//                                                 <option value="">{field.ph}</option>
//                                                 {field.opts.map(o => <option key={o} value={o} className="bg-slate-900 text-left">{o}</option>)}
//                                             </select>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Time */}
//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaClock className={theme.text} /> Time</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     {[
//                                         { val: time.hour, set: (v)=>setTime({...time, hour:v}), opts: hours, ph: "Hr" },
//                                         { val: time.minute, set: (v)=>setTime({...time, minute:v}), opts: minutes, ph: "Min" },
//                                         { val: time.ampm, set: (v)=>setTime({...time, ampm:v}), opts: ["AM","PM"], ph: "" }
//                                     ].map((field, idx) => (
//                                         <select key={idx} value={field.val} onChange={(e)=>field.set(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-sm outline-none focus:border-white/40 appearance-none text-center cursor-pointer hover:bg-white/5 transition-colors">
//                                             {field.ph && <option value="">{field.ph}</option>}
//                                             {field.opts.map(o => <option key={o} value={o} className="bg-slate-900 text-left">{o}</option>)}
//                                         </select>
//                                     ))}
//                                 </div>
//                             </div>

//                             {/* Duration */}
//                             <div className="mb-8">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Duration</label>
//                                 <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-white/40 cursor-pointer hover:bg-white/5 transition-colors">
//                                     <option value="15" className="bg-slate-900">15 Minutes</option>
//                                     <option value="30" className="bg-slate-900">30 Minutes</option>
//                                     <option value="45" className="bg-slate-900">45 Minutes</option>
//                                     <option value="60" className="bg-slate-900">1 Hour</option>
//                                 </select>
//                             </div>

//                             <button type="submit" className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-r ${theme.gradient} ${theme.hover}`}>
//                                 SCHEDULE MEETING
//                             </button>
//                         </div>
//                     </div>

//                     {/* --- RIGHT: PARTICIPANTS --- */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl h-full flex flex-col">
//                             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
//                                 <h3 className="text-lg font-bold text-white flex items-center gap-3">
//                                     <span className={`p-2 rounded-lg ${theme.iconBg} ${theme.text}`}><FaUser /></span>
//                                     Participants <span className="bg-white/10 px-2 py-0.5 rounded text-sm text-gray-300">{selectedUsers.length}</span>
//                                 </h3>
//                                 <button type="button" onClick={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))} className={`text-xs font-bold ${theme.text} hover:text-white transition`}>
//                                     {selectedUsers.length === users.length ? "DESELECT ALL" : "SELECT ALL"}
//                                 </button>
//                             </div>

//                             {/* Scrollable Grid */}
//                             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
//                                 {users.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         {users.map(u => {
//                                             const isSelected = selectedUsers.includes(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleUser(u._id)}
//                                                     className={`group relative p-4 rounded-2xl border border-white/5 cursor-pointer transition-all duration-300 ${isSelected ? theme.cardSelected : 'bg-black/20 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1'}`}
//                                                 >
//                                                     <div className="flex items-center gap-4">
//                                                         {/* Avatar */}
//                                                         <div className="shrink-0">
//                                                             {u.idPhoto ? (
//                                                                 <img 
//                                                                     src={getImageUrl(u.idPhoto)} 
//                                                                     alt={u.firstName} 
//                                                                     className={`w-14 h-14 rounded-full object-cover border-2 shadow-lg transition-all ${isSelected ? theme.border : 'border-white/20 group-hover:border-white/50'}`}
//                                                                 />
//                                                             ) : (
//                                                                 <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all ${isSelected ? `bg-gradient-to-br ${theme.gradient}` : 'bg-slate-800 text-gray-400 group-hover:bg-slate-700'}`}>
//                                                                     {u.firstName?.[0]}
//                                                                 </div>
//                                                             )}
//                                                         </div>
                                                        
//                                                         <div className="min-w-0">
//                                                             <h4 className={`font-bold text-lg truncate transition-colors ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{u.firstName} {u.lastName}</h4>
//                                                             <p className={`text-xs truncate transition-colors ${isSelected ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
//                                                                 {isPoliceMeeting ? (u.designation || 'Officer') : `ID: ${u._id.slice(-6).toUpperCase()}`}
//                                                             </p>
//                                                             {isPoliceMeeting && <p className="text-[10px] text-gray-500 truncate mt-0.5">{u.station}</p>}
//                                                         </div>
//                                                     </div>

//                                                     {/* Checkmark */}
//                                                     <div className={`absolute top-4 right-4 text-xl transition-all duration-300 ${isSelected ? `opacity-100 ${theme.text} scale-100` : 'opacity-0 scale-50'}`}>
//                                                         <FaCheckCircle />
//                                                     </div>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center justify-center h-40 opacity-50">
//                                         <p className="text-gray-400">No available users found.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>

//                 </form>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default ScheduleMeeting;








// import React, { useState, useEffect } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios"; // ✅ Switched to standard axios to fix import errors
// import { toast } from "react-hot-toast";
// import { 
//     FaUser, FaVideo, FaUserShield, FaCheckCircle, 
//     FaArrowLeft, FaCalendarAlt, FaClock 
// } from "react-icons/fa";
// import { BASE_URL } from "../../config"; // ✅ Importing BASE_URL instead of hardcoding

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");

//   const bgImage = isPoliceMeeting 
//     ? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
//     : "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000";

//   // Color Palettes
//   const theme = isPoliceMeeting ? {
//       gradient: "from-emerald-600 to-teal-500",
//       hover: "hover:from-emerald-500 hover:to-teal-400",
//       border: "border-emerald-500",
//       text: "text-emerald-400",
//       shadow: "hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
//       cardSelected: "bg-emerald-900/40 border-emerald-500",
//       iconBg: "bg-emerald-500/20"
//   } : {
//       gradient: "from-violet-600 to-fuchsia-500",
//       hover: "hover:from-violet-500 hover:to-fuchsia-400",
//       border: "border-fuchsia-500",
//       text: "text-fuchsia-400",
//       shadow: "hover:shadow-[0_0_20px_rgba(192,38,211,0.4)]",
//       cardSelected: "bg-fuchsia-900/40 border-fuchsia-500",
//       iconBg: "bg-fuchsia-500/20"
//   };

//   // State
//   const [date, setDate] = useState({ day: "", month: "", year: "2026" });
//   const [time, setTime] = useState({ hour: "", minute: "00", ampm: "AM" });
//   const [duration, setDuration] = useState("30");
//   const [title, setTitle] = useState(searchParams.get("title") || "");
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   // Helper function for Images
//   const getImageUrl = (path) => {
//       if (!path) return null;
//       return path.startsWith("http") ? path : `${BASE_URL}/${path.replace(/\\/g, "/")}`;
//   };

//   // Dropdown Data
//   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const years = ["2026", "2027", "2028"];
//   const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const minutes = ["00", "15", "30", "45"];

//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   // ✅ FETCH USERS (Using Standard Axios + Token)
//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//             if (!userInfo) return;

//             const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
            
//             // ✅ Correct Backend Route: /api/meetings/users
//             const { data } = await axios.get(`${BASE_URL}/api/meetings/users?role=${roleQuery}`, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` }
//             });
//             setUsers(data);
//         } catch (error) { 
//             console.error("Error fetching users", error);
//             toast.error("Could not load contacts");
//             setUsers([]);
//         }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     else setSelectedUsers([...selectedUsers, userId]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//     if (!title || !date.day || !date.month || !time.hour) return toast.error("Please fill all details.");
//     if (selectedUsers.length === 0) return toast.error("Select at least one participant.");

//     const monthIndex = months.indexOf(date.month);
//     let hour24 = parseInt(time.hour);
//     if (time.ampm === "PM" && hour24 !== 12) hour24 += 12;
//     if (time.ampm === "AM" && hour24 === 12) hour24 = 0;

//     const startDateTime = new Date(parseInt(date.year), monthIndex, parseInt(date.day), hour24, parseInt(time.minute));
//     const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

//     if (startDateTime < new Date()) return toast.error("Meeting time cannot be in the past.");

//     try {
//       await axios.post(`${BASE_URL}/api/meetings/schedule`, {
//         title,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         meetingType: isPoliceMeeting ? "Police" : "Citizen",
//         participants: selectedUsers
//       }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });

//       toast.success("Meeting Scheduled!");
//       navigate(-1);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
//         <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4) blur(4px)" }} />

//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-4 md:p-10">
//             <div className="max-w-6xl mx-auto">
//                 {/* HEADER */}
//                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
//                     <button onClick={() => navigate(-1)} className="bg-white/10 w-fit p-3 rounded-full hover:bg-white/20 transition backdrop-blur-md border border-white/10 group">
//                         <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
//                     </button>
//                     <div>
//                         <h2 className={`text-2xl md:text-3xl font-bold flex items-center gap-3 ${theme.text}`}>
//                             {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
//                             {isPoliceMeeting ? "Internal Police Briefing" : "Citizen Video Inquiry"}
//                         </h2>
//                         <p className="text-gray-300 text-sm mt-1 opacity-80">Configure schedule parameters and select participants</p>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
//                     {/* LEFT: FORM DETAILS */}
//                     <div className="lg:col-span-1 space-y-6">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
//                             <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
//                                 <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${theme.gradient}`}></span>
//                                 Session Details
//                             </h3>
                            
//                             <div className="mb-6 group">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 group-focus-within:text-white transition-colors">Meeting Title</label>
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all"
//                                     placeholder="e.g. Urgent Case Review"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaCalendarAlt className={theme.text} /> Date</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     {[
//                                         { val: date.day, set: (v)=>setDate({...date, day:v}), opts: days, ph: "Day" },
//                                         { val: date.month, set: (v)=>setDate({...date, month:v}), opts: months, ph: "Month" },
//                                         { val: date.year, set: (v)=>setDate({...date, year:v}), opts: years, ph: "Year" }
//                                     ].map((field, idx) => (
//                                         <div key={idx} className="relative">
//                                             <select value={field.val} onChange={(e)=>field.set(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-sm outline-none focus:border-white/40 appearance-none text-center cursor-pointer hover:bg-white/5 transition-colors">
//                                                 <option value="">{field.ph}</option>
//                                                 {field.opts.map(o => <option key={o} value={o} className="bg-slate-900 text-left">{o}</option>)}
//                                             </select>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaClock className={theme.text} /> Time</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     {[
//                                         { val: time.hour, set: (v)=>setTime({...time, hour:v}), opts: hours, ph: "Hr" },
//                                         { val: time.minute, set: (v)=>setTime({...time, minute:v}), opts: minutes, ph: "Min" },
//                                         { val: time.ampm, set: (v)=>setTime({...time, ampm:v}), opts: ["AM","PM"], ph: "" }
//                                     ].map((field, idx) => (
//                                         <select key={idx} value={field.val} onChange={(e)=>field.set(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl p-2 text-sm outline-none focus:border-white/40 appearance-none text-center cursor-pointer hover:bg-white/5 transition-colors">
//                                             {field.ph && <option value="">{field.ph}</option>}
//                                             {field.opts.map(o => <option key={o} value={o} className="bg-slate-900 text-left">{o}</option>)}
//                                         </select>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="mb-8">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2">Duration</label>
//                                 <select value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-white/40 cursor-pointer hover:bg-white/5 transition-colors">
//                                     <option value="15" className="bg-slate-900">15 Minutes</option>
//                                     <option value="30" className="bg-slate-900">30 Minutes</option>
//                                     <option value="45" className="bg-slate-900">45 Minutes</option>
//                                     <option value="60" className="bg-slate-900">1 Hour</option>
//                                 </select>
//                             </div>

//                             <button type="submit" className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all transform hover:-translate-y-1 bg-gradient-to-r ${theme.gradient} ${theme.hover}`}>
//                                 SCHEDULE MEETING
//                             </button>
//                         </div>
//                     </div>

//                     {/* RIGHT: PARTICIPANTS */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl h-full flex flex-col">
//                             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
//                                 <h3 className="text-lg font-bold text-white flex items-center gap-3">
//                                     <span className={`p-2 rounded-lg ${theme.iconBg} ${theme.text}`}><FaUser /></span>
//                                     Participants <span className="bg-white/10 px-2 py-0.5 rounded text-sm text-gray-300">{selectedUsers.length}</span>
//                                 </h3>
//                                 <button type="button" onClick={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))} className={`text-xs font-bold ${theme.text} hover:text-white transition`}>
//                                     {selectedUsers.length === users.length ? "DESELECT ALL" : "SELECT ALL"}
//                                 </button>
//                             </div>

//                             {/* USER LIST GRID */}
//                             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
//                                 {users.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         {users.map(u => {
//                                             const isSelected = selectedUsers.includes(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleUser(u._id)}
//                                                     className={`group relative p-4 rounded-2xl border border-white/5 cursor-pointer transition-all duration-300 ${isSelected ? theme.cardSelected : 'bg-black/20 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1'}`}
//                                                 >
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="shrink-0">
//                                                             {u.idPhoto ? (
//                                                                 <img 
//                                                                     src={getImageUrl(u.idPhoto)} 
//                                                                     alt={u.firstName} 
//                                                                     className={`w-14 h-14 rounded-full object-cover border-2 shadow-lg transition-all ${isSelected ? theme.border : 'border-white/20 group-hover:border-white/50'}`}
//                                                                 />
//                                                             ) : (
//                                                                 <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all ${isSelected ? `bg-gradient-to-br ${theme.gradient}` : 'bg-slate-800 text-gray-400 group-hover:bg-slate-700'}`}>
//                                                                     {u.firstName?.[0]}
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                         <div className="min-w-0">
//                                                             <h4 className={`font-bold text-lg truncate transition-colors ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{u.firstName} {u.lastName}</h4>
//                                                             <p className={`text-xs truncate transition-colors ${isSelected ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
//                                                                 {isPoliceMeeting ? (u.designation || 'Officer') : `ID: ${u._id.slice(-6).toUpperCase()}`}
//                                                             </p>
//                                                             {isPoliceMeeting && <p className="text-[10px] text-gray-500 truncate mt-0.5">{u.station}</p>}
//                                                         </div>
//                                                     </div>
//                                                     <div className={`absolute top-4 right-4 text-xl transition-all duration-300 ${isSelected ? `opacity-100 ${theme.text} scale-100` : 'opacity-0 scale-50'}`}>
//                                                         <FaCheckCircle />
//                                                     </div>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center justify-center h-40 opacity-50">
//                                         <p className="text-gray-400">No available users found.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default ScheduleMeeting;










// import React, { useState, useEffect, useRef } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios"; 
// import { toast } from "react-hot-toast";
// import { 
//     FaUser, FaVideo, FaUserShield, FaCheckCircle, 
//     FaArrowLeft, FaCalendarAlt, FaClock, FaChevronDown, FaHourglassHalf
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion"; // ✅ Animation Library
// import { BASE_URL } from "../../config"; 

// // --- ✨ CUSTOM ANIMATED DROPDOWN COMPONENT ---
// const CustomDropdown = ({ options, value, onChange, placeholder, className }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const ref = useRef(null);

//     // Close dropdown if clicked outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className={`relative ${className}`} ref={ref}>
//             <button
//                 type="button"
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-full bg-black/30 border border-white/10 hover:border-white/30 text-white rounded-xl px-4 py-3 text-sm flex items-center justify-between transition-all duration-300 shadow-sm focus:ring-2 focus:ring-white/10 outline-none"
//             >
//                 <span className={value ? "text-white" : "text-gray-400"}>
//                     {value || placeholder}
//                 </span>
//                 <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
//             </button>

//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2, ease: "easeOut" }}
//                         className="absolute z-50 mt-2 w-full bg-[#1a202c] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar backdrop-blur-xl"
//                     >
//                         {options.map((option, idx) => (
//                             <div
//                                 key={idx}
//                                 onClick={() => {
//                                     onChange(option);
//                                     setIsOpen(false);
//                                 }}
//                                 className="px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
//                             >
//                                 {option}
//                             </div>
//                         ))}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");

//   const bgImage = isPoliceMeeting 
//     ? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
//     : "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000";

//   // Color Palettes with Enhanced Effects
//   const theme = isPoliceMeeting ? {
//       gradient: "from-emerald-600 to-teal-500",
//       button: "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20",
//       border: "border-emerald-500",
//       text: "text-emerald-400",
//       cardSelected: "bg-emerald-900/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
//       iconBg: "bg-emerald-500/20"
//   } : {
//       gradient: "from-violet-600 to-fuchsia-500",
//       button: "bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 shadow-fuchsia-500/20",
//       border: "border-fuchsia-500",
//       text: "text-fuchsia-400",
//       cardSelected: "bg-fuchsia-900/40 border-fuchsia-500 shadow-[0_0_15px_rgba(192,38,211,0.3)]",
//       iconBg: "bg-fuchsia-500/20"
//   };

//   // State
//   const [date, setDate] = useState({ day: "", month: "", year: "2026" });
//   const [time, setTime] = useState({ hour: "", minute: "00", ampm: "AM" });
  
//   // ✅ FIX 1: Custom Duration Input (String initially to allow empty)
//   const [duration, setDuration] = useState(""); 
  
//   const [title, setTitle] = useState(searchParams.get("title") || "");
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   // Helper function for Images
//   const getImageUrl = (path) => {
//       if (!path) return null;
//       return path.startsWith("http") ? path : `${BASE_URL}/${path.replace(/\\/g, "/")}`;
//   };

//   // Dropdown Data Arrays
//   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const years = ["2026", "2027", "2028"];
//   const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const minutes = ["00", "15", "30", "45"]; // You can add more if needed, but time allows manual entry

//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   // Fetch Users
//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//             if (!userInfo) return;

//             const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
            
//             const { data } = await axios.get(`${BASE_URL}/api/meetings/users?role=${roleQuery}`, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` }
//             });
//             setUsers(data);
//         } catch (error) { 
//             console.error("Error fetching users", error);
//             toast.error("Could not load contacts");
//             setUsers([]);
//         }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     else setSelectedUsers([...selectedUsers, userId]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//     if (!title || !date.day || !date.month || !time.hour || !duration) return toast.error("Please fill all details.");
//     if (selectedUsers.length === 0) return toast.error("Select at least one participant.");

//     // Date Parsing Logic
//     const monthIndex = months.indexOf(date.month);
//     let hour24 = parseInt(time.hour);
//     if (time.ampm === "PM" && hour24 !== 12) hour24 += 12;
//     if (time.ampm === "AM" && hour24 === 12) hour24 = 0;

//     const startDateTime = new Date(parseInt(date.year), monthIndex, parseInt(date.day), hour24, parseInt(time.minute));
    
//     // Strict Past Time Check
//     const now = new Date();
//     if (startDateTime < now) {
//         return toast.error("⚠️ Invalid Time: Cannot schedule a meeting in the past! Please check Date & Time.");
//     }

//     const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

//     try {
//       await axios.post(`${BASE_URL}/api/meetings/schedule`, {
//         title,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         meetingType: isPoliceMeeting ? "Police" : "Citizen",
//         participants: selectedUsers
//       }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });

//       toast.success("Meeting Scheduled Successfully!");
//       navigate(-1);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
//         {/* Background */}
//         <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4) blur(4px)" }} />

//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-4 md:p-10">
//             <div className="max-w-6xl mx-auto">
//                 {/* HEADER */}
//                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
//                     <button onClick={() => navigate(-1)} className="bg-white/10 w-fit p-3 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/10 group active:scale-90">
//                         <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
//                     </button>
//                     <div>
//                         <h2 className={`text-2xl md:text-3xl font-bold flex items-center gap-3 ${theme.text}`}>
//                             {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
//                             {isPoliceMeeting ? "Internal Police Briefing" : "Citizen Video Inquiry"}
//                         </h2>
//                         <p className="text-gray-300 text-sm mt-1 opacity-80">Configure schedule parameters and select participants</p>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
//                     {/* LEFT: FORM DETAILS */}
//                     <div className="lg:col-span-1 space-y-6">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
//                             <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
//                                 <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${theme.gradient}`}></span>
//                                 Session Details
//                             </h3>
                            
//                             {/* Title Input */}
//                             <div className="mb-6 group">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 group-focus-within:text-white transition-colors duration-300">Meeting Title</label>
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/5"
//                                     placeholder="e.g. Urgent Case Review"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>

//                             {/* Date Section with Animated Dropdowns */}
//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaCalendarAlt className={theme.text} /> Date</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <CustomDropdown options={days} value={date.day} onChange={(v)=>setDate({...date, day:v})} placeholder="Day" />
//                                     <CustomDropdown options={months} value={date.month} onChange={(v)=>setDate({...date, month:v})} placeholder="Month" />
//                                     <CustomDropdown options={years} value={date.year} onChange={(v)=>setDate({...date, year:v})} placeholder="Year" />
//                                 </div>
//                             </div>

//                             {/* Time Section with Animated Dropdowns */}
//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaClock className={theme.text} /> Time</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <CustomDropdown options={hours} value={time.hour} onChange={(v)=>setTime({...time, hour:v})} placeholder="Hr" />
//                                     <CustomDropdown options={minutes} value={time.minute} onChange={(v)=>setTime({...time, minute:v})} placeholder="Min" />
//                                     <CustomDropdown options={["AM", "PM"]} value={time.ampm} onChange={(v)=>setTime({...time, ampm:v})} placeholder="--" />
//                                 </div>
//                             </div>

//                             {/* ✅ FIX 2: Custom Manual Duration Input */}
//                             <div className="mb-8">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaHourglassHalf className={theme.text} /> Duration (Minutes)</label>
//                                 <div className="relative">
//                                     <input 
//                                         type="number" 
//                                         min="1"
//                                         className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/5 pr-12"
//                                         placeholder="e.g. 45"
//                                         value={duration}
//                                         onChange={(e) => setDuration(e.target.value)}
//                                     />
//                                     <span className="absolute right-4 top-3.5 text-xs text-gray-500 font-bold uppercase pointer-events-none">MINS</span>
//                                 </div>
//                             </div>

//                             {/* Submit Button with Slow Motion Effect */}
//                             <button 
//                                 type="submit" 
//                                 className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 active:duration-100 ${theme.button}`}
//                             >
//                                 SCHEDULE MEETING
//                             </button>
//                         </div>
//                     </div>

//                     {/* RIGHT: PARTICIPANTS */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl h-full flex flex-col">
//                             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
//                                 <h3 className="text-lg font-bold text-white flex items-center gap-3">
//                                     <span className={`p-2 rounded-lg ${theme.iconBg} ${theme.text}`}><FaUser /></span>
//                                     Participants <span className="bg-white/10 px-2 py-0.5 rounded text-sm text-gray-300">{selectedUsers.length}</span>
//                                 </h3>
//                                 <button type="button" onClick={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))} className={`text-xs font-bold ${theme.text} hover:text-white transition duration-300`}>
//                                     {selectedUsers.length === users.length ? "DESELECT ALL" : "SELECT ALL"}
//                                 </button>
//                             </div>

//                             {/* USER LIST GRID */}
//                             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
//                                 {users.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         {users.map(u => {
//                                             const isSelected = selectedUsers.includes(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleUser(u._id)}
//                                                     className={`group relative p-4 rounded-2xl border border-white/5 cursor-pointer transition-all duration-500 ease-out ${isSelected ? theme.cardSelected : 'bg-black/20 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1'}`}
//                                                 >
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="shrink-0">
//                                                             {u.idPhoto ? (
//                                                                 <img 
//                                                                     src={getImageUrl(u.idPhoto)} 
//                                                                     alt={u.firstName} 
//                                                                     className={`w-14 h-14 rounded-full object-cover border-2 shadow-lg transition-all duration-300 ${isSelected ? theme.border : 'border-white/20 group-hover:border-white/50'}`}
//                                                                 />
//                                                             ) : (
//                                                                 <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 ${isSelected ? `bg-gradient-to-br ${theme.gradient}` : 'bg-slate-800 text-gray-400 group-hover:bg-slate-700'}`}>
//                                                                     {u.firstName?.[0]}
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                         <div className="min-w-0">
//                                                             <h4 className={`font-bold text-lg truncate transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{u.firstName} {u.lastName}</h4>
//                                                             <p className={`text-xs truncate transition-colors duration-300 ${isSelected ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
//                                                                 {isPoliceMeeting ? (u.designation || 'Officer') : `ID: ${u._id.slice(-6).toUpperCase()}`}
//                                                             </p>
//                                                             {isPoliceMeeting && <p className="text-[10px] text-gray-500 truncate mt-0.5">{u.station}</p>}
//                                                         </div>
//                                                     </div>
//                                                     <div className={`absolute top-4 right-4 text-xl transition-all duration-500 ${isSelected ? `opacity-100 ${theme.text} scale-100` : 'opacity-0 scale-50'}`}>
//                                                         <FaCheckCircle />
//                                                     </div>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center justify-center h-40 opacity-50">
//                                         <p className="text-gray-400">No available users found.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default ScheduleMeeting;















// import React, { useState, useEffect, useRef } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios"; 
// import { toast } from "react-hot-toast";
// import { 
//     FaUser, FaVideo, FaUserShield, FaCheckCircle, 
//     FaArrowLeft, FaCalendarAlt, FaClock, FaChevronDown, FaHourglassHalf
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion"; 
// import { BASE_URL } from "../../config"; 

// // --- ✨ CUSTOM ANIMATED DROPDOWN COMPONENT (UI Same as before) ---
// const CustomDropdown = ({ options, value, onChange, placeholder, className }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const ref = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className={`relative ${className}`} ref={ref}>
//             <button
//                 type="button"
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-full bg-black/30 border border-white/10 hover:border-white/30 text-white rounded-xl px-4 py-3 text-sm flex items-center justify-between transition-all duration-300 shadow-sm focus:ring-2 focus:ring-white/10 outline-none"
//             >
//                 <span className={value ? "text-white" : "text-gray-400"}>
//                     {value || placeholder}
//                 </span>
//                 <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
//             </button>

//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2, ease: "easeOut" }}
//                         className="absolute z-50 mt-2 w-full bg-[#1a202c] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar backdrop-blur-xl"
//                     >
//                         {options.map((option, idx) => (
//                             <div
//                                 key={idx}
//                                 onClick={() => {
//                                     onChange(option);
//                                     setIsOpen(false);
//                                 }}
//                                 className="px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
//                             >
//                                 {option}
//                             </div>
//                         ))}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");

//   const bgImage = isPoliceMeeting 
//     ? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
//     : "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000";

//   const theme = isPoliceMeeting ? {
//       gradient: "from-emerald-600 to-teal-500",
//       button: "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20",
//       border: "border-emerald-500",
//       text: "text-emerald-400",
//       cardSelected: "bg-emerald-900/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
//       iconBg: "bg-emerald-500/20"
//   } : {
//       gradient: "from-violet-600 to-fuchsia-500",
//       button: "bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 shadow-fuchsia-500/20",
//       border: "border-fuchsia-500",
//       text: "text-fuchsia-400",
//       cardSelected: "bg-fuchsia-900/40 border-fuchsia-500 shadow-[0_0_15px_rgba(192,38,211,0.3)]",
//       iconBg: "bg-fuchsia-500/20"
//   };

//   const [date, setDate] = useState({ day: "", month: "", year: "2026" });
//   const [time, setTime] = useState({ hour: "", minute: "00", ampm: "AM" });
//   const [duration, setDuration] = useState(""); 
//   const [title, setTitle] = useState(searchParams.get("title") || "");
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

//   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const years = ["2026", "2027", "2028"];
//   const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const minutes = ["00", "15", "30", "45"]; 

//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//             if (!userInfo) return;
//             const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
//             const { data } = await axios.get(`${BASE_URL}/api/meetings/users?role=${roleQuery}`, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` }
//             });
//             setUsers(data);
//         } catch (error) { 
//             console.error("Error fetching users", error);
//             toast.error("Could not load contacts");
//             setUsers([]);
//         }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     else setSelectedUsers([...selectedUsers, userId]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//     // 1. Basic Empty Check
//     if (!title || !date.day || !date.month || !time.hour || !duration) {
//         return toast.error("Please fill all details.");
//     }
//     if (selectedUsers.length === 0) {
//         return toast.error("Select at least one participant.");
//     }

//     // 2. Construct Date Object
//     const monthIndex = months.indexOf(date.month);
//     let hour24 = parseInt(time.hour);
    
//     // Logic: Convert to 24 Hour Format
//     if (time.ampm === "PM" && hour24 !== 12) hour24 += 12;
//     if (time.ampm === "AM" && hour24 === 12) hour24 = 0;

//     const startDateTime = new Date(parseInt(date.year), monthIndex, parseInt(date.day), hour24, parseInt(time.minute));
//     const now = new Date();

//     // 3. ✅ STRICT VALIDATION (Ye hai main fix)
//     // Check 1: Kya Date Invalid hai? (Jaise Feb 30)
//     if (isNaN(startDateTime.getTime())) {
//         return toast.error("Invalid Date or Time selected.");
//     }

//     // Check 2: Kya Time Past ka hai?
//     if (startDateTime < now) {
//         // Aapka custom message
//         return toast.error("⚠️ Baba yeh timing past walo hain! Future time select karo.");
//     }

//     const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

//     try {
//       await axios.post(`${BASE_URL}/api/meetings/schedule`, {
//         title,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         meetingType: isPoliceMeeting ? "Police" : "Citizen",
//         participants: selectedUsers
//       }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });

//       toast.success("Meeting Scheduled Successfully!");
//       navigate(-1);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
//         <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4) blur(4px)" }} />

//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar p-4 md:p-10">
//             <div className="max-w-6xl mx-auto">
//                 <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
//                     <button onClick={() => navigate(-1)} className="bg-white/10 w-fit p-3 rounded-full hover:bg-white/20 transition-all duration-300 backdrop-blur-md border border-white/10 group active:scale-90">
//                         <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
//                     </button>
//                     <div>
//                         <h2 className={`text-2xl md:text-3xl font-bold flex items-center gap-3 ${theme.text}`}>
//                             {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
//                             {isPoliceMeeting ? "Internal Police Briefing" : "Citizen Video Inquiry"}
//                         </h2>
//                         <p className="text-gray-300 text-sm mt-1 opacity-80">Configure schedule parameters and select participants</p>
//                     </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
//                     <div className="lg:col-span-1 space-y-6">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
//                             <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
//                                 <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${theme.gradient}`}></span>
//                                 Session Details
//                             </h3>
                            
//                             <div className="mb-6 group">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 group-focus-within:text-white transition-colors duration-300">Meeting Title</label>
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/5"
//                                     placeholder="e.g. Urgent Case Review"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaCalendarAlt className={theme.text} /> Date</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <CustomDropdown options={days} value={date.day} onChange={(v)=>setDate({...date, day:v})} placeholder="Day" />
//                                     <CustomDropdown options={months} value={date.month} onChange={(v)=>setDate({...date, month:v})} placeholder="Month" />
//                                     <CustomDropdown options={years} value={date.year} onChange={(v)=>setDate({...date, year:v})} placeholder="Year" />
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaClock className={theme.text} /> Time</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <CustomDropdown options={hours} value={time.hour} onChange={(v)=>setTime({...time, hour:v})} placeholder="Hr" />
//                                     <CustomDropdown options={minutes} value={time.minute} onChange={(v)=>setTime({...time, minute:v})} placeholder="Min" />
//                                     <CustomDropdown options={["AM", "PM"]} value={time.ampm} onChange={(v)=>setTime({...time, ampm:v})} placeholder="--" />
//                                 </div>
//                             </div>

//                             <div className="mb-8">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaHourglassHalf className={theme.text} /> Duration (Minutes)</label>
//                                 <div className="relative">
//                                     <input 
//                                         type="number" 
//                                         min="1"
//                                         className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/5 pr-12"
//                                         placeholder="e.g. 45"
//                                         value={duration}
//                                         onChange={(e) => setDuration(e.target.value)}
//                                     />
//                                     <span className="absolute right-4 top-3.5 text-xs text-gray-500 font-bold uppercase pointer-events-none">MINS</span>
//                                 </div>
//                             </div>

//                             <button 
//                                 type="submit" 
//                                 className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 active:duration-100 ${theme.button}`}
//                             >
//                                 SCHEDULE MEETING
//                             </button>
//                         </div>
//                     </div>

//                     <div className="lg:col-span-2">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl h-full flex flex-col">
//                             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
//                                 <h3 className="text-lg font-bold text-white flex items-center gap-3">
//                                     <span className={`p-2 rounded-lg ${theme.iconBg} ${theme.text}`}><FaUser /></span>
//                                     Participants <span className="bg-white/10 px-2 py-0.5 rounded text-sm text-gray-300">{selectedUsers.length}</span>
//                                 </h3>
//                                 <button type="button" onClick={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))} className={`text-xs font-bold ${theme.text} hover:text-white transition duration-300`}>
//                                     {selectedUsers.length === users.length ? "DESELECT ALL" : "SELECT ALL"}
//                                 </button>
//                             </div>

//                             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
//                                 {users.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         {users.map(u => {
//                                             const isSelected = selectedUsers.includes(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleUser(u._id)}
//                                                     className={`group relative p-4 rounded-2xl border border-white/5 cursor-pointer transition-all duration-500 ease-out ${isSelected ? theme.cardSelected : 'bg-black/20 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1'}`}
//                                                 >
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="shrink-0">
//                                                             {u.idPhoto ? (
//                                                                 <img 
//                                                                     src={getImageUrl(u.idPhoto)} 
//                                                                     alt={u.firstName} 
//                                                                     className={`w-14 h-14 rounded-full object-cover border-2 shadow-lg transition-all duration-300 ${isSelected ? theme.border : 'border-white/20 group-hover:border-white/50'}`}
//                                                                 />
//                                                             ) : (
//                                                                 <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 ${isSelected ? `bg-gradient-to-br ${theme.gradient}` : 'bg-slate-800 text-gray-400 group-hover:bg-slate-700'}`}>
//                                                                     {u.firstName?.[0]}
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                         <div className="min-w-0">
//                                                             <h4 className={`font-bold text-lg truncate transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{u.firstName} {u.lastName}</h4>
//                                                             <p className={`text-xs truncate transition-colors duration-300 ${isSelected ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
//                                                                 {isPoliceMeeting ? (u.designation || 'Officer') : `ID: ${u._id.slice(-6).toUpperCase()}`}
//                                                             </p>
//                                                             {isPoliceMeeting && <p className="text-[10px] text-gray-500 truncate mt-0.5">{u.station}</p>}
//                                                         </div>
//                                                     </div>
//                                                     <div className={`absolute top-4 right-4 text-xl transition-all duration-500 ${isSelected ? `opacity-100 ${theme.text} scale-100` : 'opacity-0 scale-50'}`}>
//                                                         <FaCheckCircle />
//                                                     </div>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center justify-center h-40 opacity-50">
//                                         <p className="text-gray-400">No available users found.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default ScheduleMeeting;












// import React, { useState, useEffect, useRef } from "react";
// import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios"; 
// import { toast } from "react-hot-toast";
// import { 
//     FaUser, FaVideo, FaUserShield, FaCheckCircle, 
//     FaArrowLeft, FaCalendarAlt, FaClock, FaChevronDown, FaHourglassHalf
// } from "react-icons/fa";
// import { motion, AnimatePresence } from "framer-motion"; 
// import { BASE_URL } from "../../config"; 

// // --- ✨ CUSTOM ANIMATED DROPDOWN COMPONENT ---
// const CustomDropdown = ({ options, value, onChange, placeholder, className }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const ref = useRef(null);

//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (ref.current && !ref.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     return (
//         <div className={`relative ${className}`} ref={ref}>
//             <button
//                 type="button"
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-full bg-black/30 border border-white/10 hover:border-white/30 text-white rounded-xl px-4 py-3 text-sm flex items-center justify-between transition-all duration-300 shadow-sm focus:ring-2 focus:ring-white/10 outline-none"
//             >
//                 <span className={value ? "text-white" : "text-gray-400"}>
//                     {value || placeholder}
//                 </span>
//                 <FaChevronDown className={`text-xs text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
//             </button>

//             <AnimatePresence>
//                 {isOpen && (
//                     <motion.div
//                         initial={{ opacity: 0, y: -10, scale: 0.95 }}
//                         animate={{ opacity: 1, y: 0, scale: 1 }}
//                         exit={{ opacity: 0, y: -10, scale: 0.95 }}
//                         transition={{ duration: 0.2, ease: "easeOut" }}
//                         className="absolute z-50 mt-2 w-full bg-[#1a202c] border border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar backdrop-blur-xl"
//                     >
//                         {options.map((option, idx) => (
//                             <div
//                                 key={idx}
//                                 onClick={() => {
//                                     onChange(option);
//                                     setIsOpen(false);
//                                 }}
//                                 className="px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors duration-200 first:rounded-t-xl last:rounded-b-xl"
//                             >
//                                 {option}
//                             </div>
//                         ))}
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );
// };

// const ScheduleMeeting = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const isPoliceMeeting = location.pathname.includes("/meeting/police");

//   const bgImage = isPoliceMeeting 
//     ? "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000" 
//     : "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=2000";

//   const theme = isPoliceMeeting ? {
//       gradient: "from-emerald-600 to-teal-500",
//       button: "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20",
//       border: "border-emerald-500",
//       text: "text-emerald-400",
//       cardSelected: "bg-emerald-900/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
//       iconBg: "bg-emerald-500/20"
//   } : {
//       gradient: "from-violet-600 to-fuchsia-500",
//       button: "bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 shadow-fuchsia-500/20",
//       border: "border-fuchsia-500",
//       text: "text-fuchsia-400",
//       cardSelected: "bg-fuchsia-900/40 border-fuchsia-500 shadow-[0_0_15px_rgba(192,38,211,0.3)]",
//       iconBg: "bg-fuchsia-500/20"
//   };

//   const [date, setDate] = useState({ day: "", month: "", year: "2026" });
//   const [time, setTime] = useState({ hour: "", minute: "00", ampm: "AM" });
//   const [duration, setDuration] = useState(""); 
//   const [title, setTitle] = useState(searchParams.get("title") || "");
//   const [selectedUsers, setSelectedUsers] = useState([]); 
//   const [users, setUsers] = useState([]);

//   const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

//   const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//   const years = ["2026", "2027", "2028"];
//   const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
//   const minutes = ["00", "15", "30", "45"]; 

//   useEffect(() => {
//     const urlId = searchParams.get("id");
//     if (urlId) setSelectedUsers([urlId]);
//   }, [searchParams]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//         try {
//             const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//             if (!userInfo) return;
//             const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
//             const { data } = await axios.get(`${BASE_URL}/api/meetings/users?role=${roleQuery}`, {
//                 headers: { Authorization: `Bearer ${userInfo.token}` }
//             });
//             setUsers(data);
//         } catch (error) { 
//             console.error("Error fetching users", error);
//             toast.error("Could not load contacts");
//             setUsers([]);
//         }
//     };
//     fetchUsers();
//   }, [isPoliceMeeting]);

//   const toggleUser = (userId) => {
//     if (selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId));
//     else setSelectedUsers([...selectedUsers, userId]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));

//     if (!title || !date.day || !date.month || !time.hour || !duration) {
//         return toast.error("Please fill all details.");
//     }
//     if (selectedUsers.length === 0) {
//         return toast.error("Select at least one participant.");
//     }

//     const monthIndex = months.indexOf(date.month);
//     let hour24 = parseInt(time.hour);
    
//     if (time.ampm === "PM" && hour24 !== 12) hour24 += 12;
//     if (time.ampm === "AM" && hour24 === 12) hour24 = 0;

//     const startDateTime = new Date(parseInt(date.year), monthIndex, parseInt(date.day), hour24, parseInt(time.minute));
//     const now = new Date();

//     if (isNaN(startDateTime.getTime())) {
//         return toast.error("Invalid Date or Time selected.");
//     }

//     if (startDateTime < now) {
//         return toast.error("⚠️ Baba yeh timing past walo hain! Future time select karo.");
//     }

//     const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

//     try {
//       await axios.post(`${BASE_URL}/api/meetings/schedule`, {
//         title,
//         startTime: startDateTime,
//         endTime: endDateTime,
//         meetingType: isPoliceMeeting ? "Police" : "Citizen",
//         participants: selectedUsers
//       }, {
//         headers: { Authorization: `Bearer ${userInfo.token}` }
//       });

//       toast.success("Meeting Scheduled Successfully!");
//       navigate(-1);
//     } catch (error) {
//       console.error(error);
//       toast.error("Failed to schedule meeting");
//     }
//   };

//   return (
//     <div className="relative h-screen w-full bg-gray-900 text-white font-sans overflow-hidden flex flex-col">
//         {/* Background Layer */}
//         <div className="fixed inset-0 z-0" style={{ backgroundImage: `url(${bgImage})`, backgroundSize: "cover", backgroundPosition: "center", filter: "brightness(0.4) blur(4px)" }} />

//         {/* Main Content Area - Scrollable */}
//         <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
            
//             {/* ✅ FIXED HEADER - Sticky & Shifted Up */}
//             <div className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-white/10 px-6 py-4 shadow-lg mb-6">
//                 <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center gap-4">
//                     <button 
//                         onClick={() => navigate(-1)} 
//                         className="bg-white/10 w-fit p-3 rounded-full hover:bg-white/20 transition-all duration-300 border border-white/10 group active:scale-90"
//                     >
//                         <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
//                     </button>
//                     <div>
//                         <h2 className={`text-xl md:text-2xl font-bold flex items-center gap-3 ${theme.text}`}>
//                             {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
//                             {isPoliceMeeting ? "Internal Police Briefing" : "Citizen Video Inquiry"}
//                         </h2>
//                         <p className="text-gray-300 text-xs md:text-sm mt-0.5 opacity-80">Configure schedule parameters and select participants</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Form Content */}
//             <div className="max-w-6xl mx-auto px-4 md:px-10 pb-20">
//                 <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
//                     {/* LEFT: FORM DETAILS */}
//                     <div className="lg:col-span-1 space-y-6">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl">
//                             <h3 className="text-lg font-bold text-white mb-6 border-b border-white/10 pb-3 flex items-center gap-2">
//                                 <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${theme.gradient}`}></span>
//                                 Session Details
//                             </h3>
                            
//                             <div className="mb-6 group">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 group-focus-within:text-white transition-colors duration-300">Meeting Title</label>
//                                 <input 
//                                     type="text" 
//                                     className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/5"
//                                     placeholder="e.g. Urgent Case Review"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaCalendarAlt className={theme.text} /> Date</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <CustomDropdown options={days} value={date.day} onChange={(v)=>setDate({...date, day:v})} placeholder="Day" />
//                                     <CustomDropdown options={months} value={date.month} onChange={(v)=>setDate({...date, month:v})} placeholder="Month" />
//                                     <CustomDropdown options={years} value={date.year} onChange={(v)=>setDate({...date, year:v})} placeholder="Year" />
//                                 </div>
//                             </div>

//                             <div className="mb-6">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaClock className={theme.text} /> Time</label>
//                                 <div className="grid grid-cols-3 gap-2">
//                                     <CustomDropdown options={hours} value={time.hour} onChange={(v)=>setTime({...time, hour:v})} placeholder="Hr" />
//                                     <CustomDropdown options={minutes} value={time.minute} onChange={(v)=>setTime({...time, minute:v})} placeholder="Min" />
//                                     <CustomDropdown options={["AM", "PM"]} value={time.ampm} onChange={(v)=>setTime({...time, ampm:v})} placeholder="--" />
//                                 </div>
//                             </div>

//                             <div className="mb-8">
//                                 <label className="block text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><FaHourglassHalf className={theme.text} /> Duration (Minutes)</label>
//                                 <div className="relative">
//                                     <input 
//                                         type="number" 
//                                         min="1"
//                                         className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:border-white/40 focus:bg-black/50 outline-none transition-all duration-300 focus:ring-2 focus:ring-white/5 pr-12"
//                                         placeholder="e.g. 45"
//                                         value={duration}
//                                         onChange={(e) => setDuration(e.target.value)}
//                                     />
//                                     <span className="absolute right-4 top-3.5 text-xs text-gray-500 font-bold uppercase pointer-events-none">MINS</span>
//                                 </div>
//                             </div>

//                             <button 
//                                 type="submit" 
//                                 className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 active:duration-100 ${theme.button}`}
//                             >
//                                 SCHEDULE MEETING
//                             </button>
//                         </div>
//                     </div>

//                     {/* RIGHT: PARTICIPANTS */}
//                     <div className="lg:col-span-2">
//                         <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl h-full flex flex-col">
//                             <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
//                                 <h3 className="text-lg font-bold text-white flex items-center gap-3">
//                                     <span className={`p-2 rounded-lg ${theme.iconBg} ${theme.text}`}><FaUser /></span>
//                                     Participants <span className="bg-white/10 px-2 py-0.5 rounded text-sm text-gray-300">{selectedUsers.length}</span>
//                                 </h3>
//                                 <button type="button" onClick={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))} className={`text-xs font-bold ${theme.text} hover:text-white transition duration-300`}>
//                                     {selectedUsers.length === users.length ? "DESELECT ALL" : "SELECT ALL"}
//                                 </button>
//                             </div>

//                             <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-[600px]">
//                                 {users.length > 0 ? (
//                                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                                         {users.map(u => {
//                                             const isSelected = selectedUsers.includes(u._id);
//                                             return (
//                                                 <div 
//                                                     key={u._id} 
//                                                     onClick={() => toggleUser(u._id)}
//                                                     className={`group relative p-4 rounded-2xl border border-white/5 cursor-pointer transition-all duration-500 ease-out ${isSelected ? theme.cardSelected : 'bg-black/20 hover:bg-white/5 hover:border-white/20 hover:-translate-y-1'}`}
//                                                 >
//                                                     <div className="flex items-center gap-4">
//                                                         <div className="shrink-0">
//                                                             {u.idPhoto ? (
//                                                                 <img 
//                                                                     src={getImageUrl(u.idPhoto)} 
//                                                                     alt={u.firstName} 
//                                                                     className={`w-14 h-14 rounded-full object-cover border-2 shadow-lg transition-all duration-300 ${isSelected ? theme.border : 'border-white/20 group-hover:border-white/50'}`}
//                                                                 />
//                                                             ) : (
//                                                                 <div className={`w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 ${isSelected ? `bg-gradient-to-br ${theme.gradient}` : 'bg-slate-800 text-gray-400 group-hover:bg-slate-700'}`}>
//                                                                     {u.firstName?.[0]}
//                                                                 </div>
//                                                             )}
//                                                         </div>
//                                                         <div className="min-w-0">
//                                                             <h4 className={`font-bold text-lg truncate transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{u.firstName} {u.lastName}</h4>
//                                                             <p className={`text-xs truncate transition-colors duration-300 ${isSelected ? 'text-gray-200' : 'text-gray-500 group-hover:text-gray-400'}`}>
//                                                                 {isPoliceMeeting ? (u.designation || 'Officer') : `ID: ${u._id.slice(-6).toUpperCase()}`}
//                                                             </p>
//                                                             {isPoliceMeeting && <p className="text-[10px] text-gray-500 truncate mt-0.5">{u.station}</p>}
//                                                         </div>
//                                                     </div>
//                                                     <div className={`absolute top-4 right-4 text-xl transition-all duration-500 ${isSelected ? `opacity-100 ${theme.text} scale-100` : 'opacity-0 scale-50'}`}>
//                                                         <FaCheckCircle />
//                                                     </div>
//                                                 </div>
//                                             )
//                                         })}
//                                     </div>
//                                 ) : (
//                                     <div className="flex flex-col items-center justify-center h-40 opacity-50">
//                                         <p className="text-gray-400">No available users found.</p>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     </div>
//   );
// };

// export default ScheduleMeeting;









import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios"; 
import { toast } from "react-hot-toast";
import { 
    FaUser, FaVideo, FaUserShield, FaCheckCircle, 
    FaArrowLeft, FaCalendarAlt, FaClock, FaChevronDown, FaHourglassHalf
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion"; 
import { BASE_URL } from "../../config"; 

// ✅ IMPORT BACKGROUND
import dashboardBg from '../../assets/signup-bg.png';

// --- COMPACT CUSTOM DROPDOWN ---
const CustomDropdown = ({ options, value, onChange, placeholder, className }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={ref}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full bg-black/40 border border-white/10 hover:border-white/30 text-white rounded-lg px-3 py-2.5 text-xs md:text-sm flex items-center justify-between transition-all duration-300 focus:ring-1 focus:ring-blue-500/50 outline-none"
            >
                <span className={value ? "text-white font-medium" : "text-gray-400"}>
                    {value || placeholder}
                </span>
                <FaChevronDown className={`text-[10px] text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -5, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -5, scale: 0.98 }}
                        className="absolute z-50 mt-1 w-full bg-[#1a202c] border border-white/10 rounded-lg shadow-xl max-h-48 overflow-y-auto custom-scrollbar backdrop-blur-xl"
                    >
                        {options.map((option, idx) => (
                            <div
                                key={idx}
                                onClick={() => { onChange(option); setIsOpen(false); }}
                                className="px-3 py-2 text-xs md:text-sm text-gray-300 hover:bg-white/10 hover:text-white cursor-pointer transition-colors border-b border-white/5 last:border-none"
                            >
                                {option}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ScheduleMeeting = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isPoliceMeeting = location.pathname.includes("/meeting/police");

  const theme = isPoliceMeeting ? {
      gradient: "from-emerald-600 to-teal-500",
      button: "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 shadow-emerald-500/20",
      border: "border-emerald-500",
      text: "text-emerald-400",
      cardSelected: "bg-emerald-900/40 border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]",
      iconBg: "bg-emerald-500/20"
  } : {
      gradient: "from-violet-600 to-fuchsia-500",
      button: "bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 shadow-fuchsia-500/20",
      border: "border-fuchsia-500",
      text: "text-fuchsia-400",
      cardSelected: "bg-fuchsia-900/40 border-fuchsia-500 shadow-[0_0_15px_rgba(192,38,211,0.3)]",
      iconBg: "bg-fuchsia-500/20"
  };

  const [date, setDate] = useState({ day: "", month: "", year: "2026" });
  const [time, setTime] = useState({ hour: "", minute: "00", ampm: "AM" });
  const [duration, setDuration] = useState(""); 
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [selectedUsers, setSelectedUsers] = useState([]); 
  const [users, setUsers] = useState([]);

  const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const years = ["2026", "2027", "2028"];
  const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
  const minutes = ["00", "15", "30", "45"]; 

  useEffect(() => {
    const urlId = searchParams.get("id");
    if (urlId) setSelectedUsers([urlId]);
  }, [searchParams]);

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if (!userInfo) return;
            const roleQuery = isPoliceMeeting ? "police,senior" : "citizen";
            const { data } = await axios.get(`${BASE_URL}/api/meetings/users?role=${roleQuery}`, {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            });
            setUsers(data);
        } catch (error) { 
            console.error("Error fetching users", error);
            toast.error("Could not load contacts");
            setUsers([]);
        }
    };
    fetchUsers();
  }, [isPoliceMeeting]);

  const toggleUser = (userId) => {
    if (selectedUsers.includes(userId)) setSelectedUsers(selectedUsers.filter(id => id !== userId));
    else setSelectedUsers([...selectedUsers, userId]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!title || !date.day || !date.month || !time.hour || !duration) return toast.error("Please fill all details.");
    if (selectedUsers.length === 0) return toast.error("Select at least one participant.");

    const monthIndex = months.indexOf(date.month);
    let hour24 = parseInt(time.hour);
    if (time.ampm === "PM" && hour24 !== 12) hour24 += 12;
    if (time.ampm === "AM" && hour24 === 12) hour24 = 0;

    const startDateTime = new Date(parseInt(date.year), monthIndex, parseInt(date.day), hour24, parseInt(time.minute));
    const endDateTime = new Date(startDateTime.getTime() + parseInt(duration) * 60000);

    try {
      await axios.post(`${BASE_URL}/api/meetings/schedule`, {
        title,
        startTime: startDateTime,
        endTime: endDateTime,
        meetingType: isPoliceMeeting ? "Police" : "Citizen",
        participants: selectedUsers
      }, { headers: { Authorization: `Bearer ${userInfo.token}` } });

      toast.success("Meeting Scheduled!");
      navigate(-1);
    } catch (error) { toast.error("Failed to schedule"); }
  };

  return (
    // ✅ MAIN CONTAINER: h-screen & overflow-hidden (Prevents page scroll)
    <div className="h-screen w-full bg-gray-900 text-white font-sans flex flex-col overflow-hidden relative">
        
        {/* Background */}
        <div className="absolute inset-0 z-0">
            <img src={dashboardBg} alt="Background" className="w-full h-full object-fill opacity-40 blur-sm" />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-black/95"></div>
        </div>

        {/* ✅ HEADER: Fixed Height (flex-none) */}
        <div className="relative z-10 flex-none bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3 md:py-4 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate(-1)} className="bg-white/10 p-2 md:p-2.5 rounded-full hover:bg-white/20 transition border border-white/10 group">
                    <FaArrowLeft className="text-sm md:text-base group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <div>
                    <h2 className={`text-lg md:text-xl font-bold flex items-center gap-2 md:gap-3 ${theme.text}`}>
                        {isPoliceMeeting ? <FaUserShield /> : <FaVideo />} 
                        {isPoliceMeeting ? "Police Briefing" : "Video Inquiry"}
                    </h2>
                    <p className="text-gray-400 text-[10px] md:text-xs">Schedule new secure session</p>
                </div>
            </div>
        </div>

        {/* ✅ CONTENT BODY: flex-1 (Takes remaining space), overflow-hidden (Prevents outer scroll) */}
        <div className="relative z-10 flex-1 min-h-0 w-full max-w-7xl mx-auto p-3 md:p-4">
            
            <form onSubmit={handleSubmit} className="h-full grid grid-cols-1 lg:grid-cols-12 gap-4">
                
                {/* --- LEFT PANEL: FORM (Takes 4 cols on large screens) --- */}
                {/* overflow-y-auto allows internal scroll on very small screens */}
                <div className="lg:col-span-4 h-full overflow-y-auto custom-scrollbar pr-1">
                    <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 md:p-5 rounded-2xl shadow-2xl h-full flex flex-col justify-between">
                        <div>
                            <h3 className="text-sm md:text-base font-bold text-white mb-4 border-b border-white/10 pb-2 flex items-center gap-2">
                                <span className={`w-1.5 h-5 rounded-full bg-gradient-to-b ${theme.gradient}`}></span>
                                Meeting Details
                            </h3>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Title</label>
                                    <input 
                                        type="text" 
                                        className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs md:text-sm text-white focus:border-blue-500/50 outline-none"
                                        placeholder="e.g. Urgent Case Review"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block flex items-center gap-1"><FaCalendarAlt /> Date</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <CustomDropdown options={days} value={date.day} onChange={(v)=>setDate({...date, day:v})} placeholder="DD" />
                                        <CustomDropdown options={months} value={date.month} onChange={(v)=>setDate({...date, month:v})} placeholder="MM" />
                                        <CustomDropdown options={years} value={date.year} onChange={(v)=>setDate({...date, year:v})} placeholder="YYYY" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block flex items-center gap-1"><FaClock /> Time</label>
                                    <div className="grid grid-cols-3 gap-2">
                                        <CustomDropdown options={hours} value={time.hour} onChange={(v)=>setTime({...time, hour:v})} placeholder="00" />
                                        <CustomDropdown options={minutes} value={time.minute} onChange={(v)=>setTime({...time, minute:v})} placeholder="00" />
                                        <CustomDropdown options={["AM", "PM"]} value={time.ampm} onChange={(v)=>setTime({...time, ampm:v})} placeholder="--" />
                                    </div>
                                </div>

                                <div>
                                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block flex items-center gap-1"><FaHourglassHalf /> Duration</label>
                                    <div className="relative">
                                        <input 
                                            type="number" 
                                            min="1"
                                            className="w-full bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs md:text-sm text-white focus:border-blue-500/50 outline-none pr-10"
                                            placeholder="45"
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                        />
                                        <span className="absolute right-3 top-2.5 text-[10px] text-gray-500 font-bold">MIN</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`w-full mt-6 py-3 rounded-xl font-bold text-sm md:text-base text-white shadow-xl transition-all transform hover:scale-[1.02] active:scale-95 ${theme.button}`}
                        >
                            CONFIRM SCHEDULE
                        </button>
                    </div>
                </div>

                {/* --- RIGHT PANEL: PARTICIPANTS (Takes 8 cols) --- */}
                {/* Flex-col with overflow-hidden ensures only the list part scrolls */}
                <div className="lg:col-span-8 h-full flex flex-col bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                    
                    {/* Fixed Header inside Panel */}
                    <div className="flex-none p-4 md:p-5 border-b border-white/10 flex justify-between items-center bg-slate-800/30">
                        <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                            <span className={`p-1.5 rounded-md ${theme.iconBg} ${theme.text}`}><FaUser /></span>
                            Select Participants <span className="bg-white/10 px-2 py-0.5 rounded text-xs text-gray-300 ml-2">{selectedUsers.length} selected</span>
                        </h3>
                        <button type="button" onClick={() => setSelectedUsers(selectedUsers.length === users.length ? [] : users.map(u => u._id))} className={`text-[10px] md:text-xs font-bold ${theme.text} hover:text-white transition uppercase tracking-wide`}>
                            {selectedUsers.length === users.length ? "Clear All" : "Select All"}
                        </button>
                    </div>

                    {/* Scrollable List Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                        {users.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {users.map(u => {
                                    const isSelected = selectedUsers.includes(u._id);
                                    return (
                                        <div 
                                            key={u._id} 
                                            onClick={() => toggleUser(u._id)}
                                            className={`relative p-3 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-3 group
                                                ${isSelected 
                                                    ? `${theme.cardSelected}` 
                                                    : 'bg-black/20 border-white/5 hover:bg-white/5 hover:border-white/20'
                                                }`}
                                        >
                                            {/* Avatar */}
                                            <div className="shrink-0 relative">
                                                {u.idPhoto ? (
                                                    <img src={getImageUrl(u.idPhoto)} alt={u.firstName} className={`w-10 h-10 rounded-full object-cover border-2 shadow-sm ${isSelected ? theme.border : 'border-white/10'}`} />
                                                ) : (
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm ${isSelected ? `bg-gradient-to-br ${theme.gradient}` : 'bg-slate-800 text-gray-400'}`}>
                                                        {u.firstName?.[0]}
                                                    </div>
                                                )}
                                                {isSelected && <div className={`absolute -bottom-1 -right-1 bg-white text-black text-[10px] rounded-full p-0.5 shadow-sm`}><FaCheckCircle /></div>}
                                            </div>

                                            {/* Info */}
                                            <div className="min-w-0 flex-1">
                                                <h4 className={`text-sm font-bold truncate ${isSelected ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>{u.firstName} {u.lastName}</h4>
                                                <p className={`text-[10px] truncate ${isSelected ? 'text-gray-200' : 'text-gray-500'}`}>
                                                    {isPoliceMeeting ? (u.designation || 'Officer') : `ID: ${u._id.slice(-6).toUpperCase()}`}
                                                </p>
                                                {isPoliceMeeting && <p className="text-[9px] text-gray-500 truncate">{u.station}</p>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full opacity-40">
                                <p className="text-gray-400 text-sm">No contacts available.</p>
                            </div>
                        )}
                    </div>
                </div>
            </form>
        </div>
    </div>
  );
};

export default ScheduleMeeting;