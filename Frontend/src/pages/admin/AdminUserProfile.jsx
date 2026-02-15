// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { FaCamera, FaArrowLeft, FaTrash, FaTimes } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // Dropdown data needs to be fetched from API in real app, using mock logic for now based on previous steps
// import { regularDesignations, seniorDesignations, policeStations } from "../../data/mockData"; 
// // Note: In Phase 3 you moved this to DB. For this specific component, I will fetch metadata from API to ensure it matches the new system.

// const AdminUserProfile = () => {
//   const { id, role } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({});
//   const [previewPhoto, setPreviewPhoto] = useState(null);
//   const [newPhoto, setNewPhoto] = useState(null);

//   // Dynamic Lists
//   const [stationsList, setStationsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);

//   // Senior Station State
//   const [selectedStations, setSelectedStations] = useState([]);

//   useEffect(() => {
//     fetchMetadata();
//     fetchUser();
//   }, []);

//   const fetchMetadata = async () => {
//       try {
//           const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//           setStationsList(data.stations.map(s => s.name));
//           setDesignationsList(role === 'senior' ? data.designations.senior : data.designations.regular);
//       } catch (err) {
//           // Fallback if metadata API fails (using static for safety)
//           setStationsList(policeStations);
//           setDesignationsList(role === 'senior' ? seniorDesignations : regularDesignations);
//       }
//   };

//   const fetchUser = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//           const { data } = await axios.get(`${BASE_URL}/api/users/${id}`, config);
//           setUserData(data);
          
//           if(role === 'senior' && data.station) {
//               setSelectedStations(data.station.split(',').map(s => s.trim()).filter(s => s));
//           }
//       } catch (error) {
//           toast.error("Error loading user");
//       }
//   };

//   const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

//   // Senior Station Logic
//   const addStation = (e) => {
//       if(e.target.value && !selectedStations.includes(e.target.value)) {
//           setSelectedStations([...selectedStations, e.target.value]);
//       }
//   };
//   const removeStation = (s) => setSelectedStations(selectedStations.filter(st => st !== s));

//   const handleSave = async () => {
//       setLoading(true);
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" } };

//       const formData = new FormData();
//       Object.keys(userData).forEach(key => {
//           if (key !== 'idPhoto' && key !== '_id' && userData[key]) formData.append(key, userData[key]);
//       });

//       if (role === 'senior') {
//           formData.set('station', selectedStations.join(", "));
//       }

//       if (newPhoto) formData.append('idPhoto', newPhoto);

//       try {
//           await axios.put(`${BASE_URL}/api/users/${id}/admin`, formData, config);
//           toast.success("User Updated Successfully!");
//       } catch (error) {
//           toast.error("Update Failed");
//       } finally {
//           setLoading(false);
//       }
//   };

//   const handleDelete = async () => {
//       if(!window.confirm("Are you sure? This action cannot be undone.")) return;
      
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           await axios.delete(`${BASE_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//           toast.success("User Deleted");
//           navigate(`/admin/data/users/${role}`);
//       } catch (error) {
//           toast.error("Delete Failed");
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Navbar />
//       <Toaster />
//       <div className="max-w-4xl mx-auto pt-28 px-4 pb-20">
        
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
//             <FaArrowLeft /> Back
//         </button>

//         <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 relative">
            
//             {/* Header / Photo */}
//             <div className="flex flex-col items-center mb-8">
//                 <div className="relative group cursor-pointer w-40 h-40 rounded-full overflow-hidden border-4 border-slate-600 shadow-xl">
//                     <img src={previewPhoto || userData.idPhoto} alt="" className="w-full h-full object-cover" />
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <FaCamera className="text-3xl text-white" />
//                     </div>
//                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
//                         setNewPhoto(e.target.files[0]);
//                         setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
//                     }}/>
//                 </div>
//                 <h2 className="text-2xl font-bold mt-4">{userData.firstName} {userData.lastName}</h2>
//                 <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full uppercase mt-1">{role}</span>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">First Name</label>
//                     <input name="firstName" value={userData.firstName || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Last Name</label>
//                     <input name="lastName" value={userData.lastName || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Email</label>
//                     <input name="email" value={userData.email || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Mobile</label>
//                     <input name="mobile" value={userData.mobile || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Aadhaar</label>
//                     <input name="aadhar" value={userData.aadhar || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Gender</label>
//                     <input name="gender" value={userData.gender || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>

//                 {/* ROLE SPECIFIC */}
//                 {role !== 'citizen' && (
//                     <>
//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-1">Designation</label>
//                             <select name="designation" value={userData.designation || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1">
//                                 <option value="">Select</option>
//                                 {designationsList.map(d => <option key={d} value={d}>{d}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-1">
//                                 {role === 'senior' ? "Jurisdiction (Multi-Select)" : "Police Station"}
//                             </label>
                            
//                             {role === 'senior' ? (
//                                 <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1">
//                                     <div className="flex flex-wrap gap-2 mb-2">
//                                         {selectedStations.map(s => (
//                                             <span key={s} className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded flex items-center gap-1">
//                                                 {s} <FaTimes className="cursor-pointer" onClick={() => removeStation(s)} />
//                                             </span>
//                                         ))}
//                                     </div>
//                                     <select onChange={addStation} className="w-full bg-black/30 border border-slate-700 rounded p-2 text-sm">
//                                         <option value="">+ Add Station</option>
//                                         {stationsList.filter(s => !selectedStations.includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
//                                     </select>
//                                 </div>
//                             ) : (
//                                 <select name="station" value={userData.station || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1">
//                                     <option value="">Select Station</option>
//                                     {stationsList.map(s => <option key={s} value={s}>{s}</option>)}
//                                 </select>
//                             )}
//                         </div>
//                     </>
//                 )}

//             </div>

//             {/* Actions */}
//             <div className="mt-8 flex gap-4">
//                 <button onClick={handleSave} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all">
//                     {loading ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button onClick={handleDelete} className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all">
//                     <FaTrash /> Delete User
//                 </button>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserProfile;











// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { FaCamera, FaArrowLeft, FaTrash, FaTimes, FaUndo } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // Fallback data if API fails
// import { regularDesignations, seniorDesignations, policeStations } from "../../data/mockData"; 

// const AdminUserProfile = () => {
//   const { id, role } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({});
//   const [previewPhoto, setPreviewPhoto] = useState(null);
//   const [newPhoto, setNewPhoto] = useState(null);
//   const [removePhoto, setRemovePhoto] = useState(false); // ✅ State for photo removal

//   // Dynamic Lists
//   const [stationsList, setStationsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [selectedStations, setSelectedStations] = useState([]);

//   // ✅ Static Options
//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];
//   const genders = ["Male", "Female", "Other"];

//   useEffect(() => {
//     fetchMetadata();
//     fetchUser();
//   }, []);

//   const fetchMetadata = async () => {
//       try {
//           const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//           setStationsList(data.stations.map(s => s.name));
//           setDesignationsList(role === 'senior' ? data.designations.senior : data.designations.regular);
//       } catch (err) {
//           setStationsList(policeStations);
//           setDesignationsList(role === 'senior' ? seniorDesignations : regularDesignations);
//       }
//   };

//   const fetchUser = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//           const { data } = await axios.get(`${BASE_URL}/api/users/${id}`, config);
//           setUserData(data);
          
//           if(role === 'senior' && data.station) {
//               setSelectedStations(data.station.split(',').map(s => s.trim()).filter(s => s));
//           }
//       } catch (error) {
//           toast.error("Error loading user");
//       }
//   };

//   const handleChange = (e) => setUserData({ ...userData, [e.target.name]: e.target.value });

//   const addStation = (e) => {
//       if(e.target.value && !selectedStations.includes(e.target.value)) {
//           setSelectedStations([...selectedStations, e.target.value]);
//       }
//   };
//   const removeStationTag = (s) => setSelectedStations(selectedStations.filter(st => st !== s));

//   // ✅ Handle Photo Removal
//   const handleRemovePhoto = () => {
//       setRemovePhoto(true);
//       setPreviewPhoto("https://via.placeholder.com/150?text=No+Image"); // Placeholder
//       setNewPhoto(null);
//   };

//   const handleSave = async () => {
//       setLoading(true);
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" } };

//       const formData = new FormData();
      
//       // Append Standard Fields
//       formData.append("title", userData.title || "Mr."); // ✅ Ensure Title is sent
//       formData.append("firstName", userData.firstName || "");
//       formData.append("lastName", userData.lastName || "");
//       formData.append("email", userData.email || "");
//       formData.append("mobile", userData.mobile || "");
//       formData.append("gender", userData.gender || "");
//       formData.append("aadhar", userData.aadhar || "");

//       // Append Role Specifics
//       if (role !== 'citizen') {
//           formData.append("designation", userData.designation || "");
//           if (role === 'senior') {
//               formData.append("station", selectedStations.join(", "));
//           } else {
//               formData.append("station", userData.station || "");
//           }
//       }

//       // ✅ Handle Photo Logic
//       if (removePhoto) {
//           formData.append("removePhoto", "true");
//       } else if (newPhoto) {
//           formData.append("idPhoto", newPhoto);
//       }

//       try {
//           await axios.put(`${BASE_URL}/api/users/${id}/admin`, formData, config);
//           toast.success("User Updated Successfully!");
//           // Reload user to see changes
//           fetchUser(); 
//           setRemovePhoto(false);
//           setNewPhoto(null);
//           setPreviewPhoto(null);
//       } catch (error) {
//           console.error(error);
//           toast.error(error.response?.data?.message || "Update Failed");
//       } finally {
//           setLoading(false);
//       }
//   };

//   const handleDelete = async () => {
//       if(!window.confirm("Are you sure? This action cannot be undone.")) return;
      
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           await axios.delete(`${BASE_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//           toast.success("User Deleted");
//           navigate(`/admin/data/users/${role}`);
//       } catch (error) {
//           toast.error("Delete Failed");
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Navbar />
//       <Toaster />
//       <div className="max-w-4xl mx-auto pt-28 px-4 pb-20">
        
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
//             <FaArrowLeft /> Back
//         </button>

//         <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 relative">
            
//             {/* Header / Photo */}
//             <div className="flex flex-col items-center mb-8">
//                 <div className="relative group cursor-pointer w-40 h-40 rounded-full overflow-hidden border-4 border-slate-600 shadow-xl bg-black">
//                     <img src={previewPhoto || userData.idPhoto} alt="Profile" className="w-full h-full object-cover" />
                    
//                     {/* Hover Overlay for Upload */}
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <FaCamera className="text-3xl text-white" />
//                     </div>
//                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
//                         setNewPhoto(e.target.files[0]);
//                         setRemovePhoto(false);
//                         setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
//                     }}/>
//                 </div>

//                 {/* ✅ Remove Photo Button */}
//                 <div className="mt-3 flex gap-3">
//                     {removePhoto ? (
//                         <button onClick={() => { setRemovePhoto(false); setPreviewPhoto(null); }} className="text-blue-400 text-xs flex items-center gap-1 hover:underline">
//                             <FaUndo /> Undo Remove
//                         </button>
//                     ) : (
//                         <button onClick={handleRemovePhoto} className="text-red-400 text-xs flex items-center gap-1 hover:underline">
//                             <FaTrash /> Remove Photo
//                         </button>
//                     )}
//                 </div>

//                 <h2 className="text-2xl font-bold mt-2">{userData.title} {userData.firstName} {userData.lastName}</h2>
//                 <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full uppercase mt-1">{role}</span>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
//                 {/* ✅ Title Dropdown */}
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Prefix / Title</label>
//                     <select name="title" value={userData.title || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                         {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">First Name</label>
//                     <input name="firstName" value={userData.firstName || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Last Name</label>
//                     <input name="lastName" value={userData.lastName || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
                
//                 {/* ✅ Gender Dropdown */}
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Gender</label>
//                     <select name="gender" value={userData.gender || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                         <option value="">Select Gender</option>
//                         {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Email</label>
//                     <input name="email" value={userData.email || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Mobile</label>
//                     <input name="mobile" value={userData.mobile || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Aadhaar</label>
//                     <input name="aadhar" value={userData.aadhar || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>

//                 {/* ROLE SPECIFIC */}
//                 {role !== 'citizen' && (
//                     <>
//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-1">Designation</label>
//                             <select name="designation" value={userData.designation || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                                 <option value="">Select</option>
//                                 {designationsList.map(d => <option key={d} value={d}>{d}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-1">
//                                 {role === 'senior' ? "Jurisdiction (Multi-Select)" : "Police Station"}
//                             </label>
                            
//                             {role === 'senior' ? (
//                                 <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1">
//                                     <div className="flex flex-wrap gap-2 mb-2">
//                                         {selectedStations.map(s => (
//                                             <span key={s} className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded flex items-center gap-1">
//                                                 {s} <FaTimes className="cursor-pointer hover:text-white" onClick={() => removeStationTag(s)} />
//                                             </span>
//                                         ))}
//                                     </div>
//                                     <select onChange={addStation} className="w-full bg-black/30 border border-slate-700 rounded p-2 text-sm text-gray-300">
//                                         <option value="">+ Add Station</option>
//                                         {stationsList.filter(s => !selectedStations.includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
//                                     </select>
//                                 </div>
//                             ) : (
//                                 <select name="station" value={userData.station || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                                     <option value="">Select Station</option>
//                                     {stationsList.map(s => <option key={s} value={s}>{s}</option>)}
//                                 </select>
//                             )}
//                         </div>
//                     </>
//                 )}

//             </div>

//             {/* Actions */}
//             <div className="mt-8 flex gap-4">
//                 <button onClick={handleSave} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg">
//                     {loading ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button onClick={handleDelete} className="bg-red-600/20 border border-red-600/50 hover:bg-red-600 text-red-400 hover:text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all">
//                     <FaTrash /> Delete User
//                 </button>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserProfile;







// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { FaCamera, FaArrowLeft, FaTrash, FaTimes, FaUndo } from "react-icons/fa"; // ✅ FaTimes included
// import { BASE_URL } from "../../config";

// // Fallback data if API fails
// import { regularDesignations, seniorDesignations, policeStations } from "../../data/mockData"; 

// const AdminUserProfile = () => {
//   const { id, role } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({});
//   const [previewPhoto, setPreviewPhoto] = useState(null);
//   const [newPhoto, setNewPhoto] = useState(null);
//   const [removePhoto, setRemovePhoto] = useState(false); // State for photo removal

//   // Dynamic Lists
//   const [stationsList, setStationsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [selectedStations, setSelectedStations] = useState([]);

//   // Static Options
//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];
//   const genders = ["Male", "Female", "Other"];

//   useEffect(() => {
//     fetchMetadata();
//     fetchUser();
//   }, []);

//   const fetchMetadata = async () => {
//       try {
//           const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//           setStationsList(data.stations.map(s => s.name));
//           setDesignationsList(role === 'senior' ? data.designations.senior : data.designations.regular);
//       } catch (err) {
//           setStationsList(policeStations);
//           setDesignationsList(role === 'senior' ? seniorDesignations : regularDesignations);
//       }
//   };

//   const fetchUser = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//           const { data } = await axios.get(`${BASE_URL}/api/users/${id}`, config);
//           setUserData(data);
          
//           if(role === 'senior' && data.station) {
//               setSelectedStations(data.station.split(',').map(s => s.trim()).filter(s => s));
//           }
//       } catch (error) {
//           toast.error("Error loading user");
//       }
//   };

//   // ✅ UPDATED: Input Restrictions (Type Check)
//   const handleChange = (e) => {
//       const { name, value } = e.target;

//       // 1. Mobile & Aadhaar: Allow ONLY Numbers
//       if (name === "mobile" || name === "aadhar") {
//           if (value && !/^\d+$/.test(value)) return; 
//       }

//       // 2. Name: Allow ONLY Alphabets & Spaces
//       if (name === "firstName" || name === "lastName") {
//           if (value && !/^[a-zA-Z\s]*$/.test(value)) return; 
//       }

//       setUserData({ ...userData, [name]: value });
//   };

//   // ✅ NEW: Validation Function (Pre-Save Check)
//   const validateForm = () => {
//       const { firstName, lastName, mobile, aadhar } = userData;

//       if (firstName && firstName.length < 2) return "First Name is too short.";
//       if (lastName && lastName.length < 2) return "Last Name is too short.";
      
//       if (mobile && mobile.length !== 10) return "Mobile Number must be exactly 10 digits.";
//       if (aadhar && aadhar.length !== 12) return "Aadhaar Number must be exactly 12 digits.";

//       return null; // No errors
//   };

//   const addStation = (e) => {
//       if(e.target.value && !selectedStations.includes(e.target.value)) {
//           setSelectedStations([...selectedStations, e.target.value]);
//       }
//   };
//   const removeStationTag = (s) => setSelectedStations(selectedStations.filter(st => st !== s));

//   // Handle Photo Removal
//   const handleRemovePhoto = () => {
//       setRemovePhoto(true);
//       setPreviewPhoto("https://res.cloudinary.com/dukrcgv8s/image/upload/v1/default-avatar.png"); // Placeholder
//       setNewPhoto(null);
//   };

//   const handleSave = async () => {
//       // ✅ Step 1: Run Validation
//       const error = validateForm();
//       if (error) return toast.error(error);

//       setLoading(true);
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" } };

//       const formData = new FormData();
      
//       // Append Standard Fields
//       formData.append("title", userData.title || "Mr.");
//       formData.append("firstName", userData.firstName || "");
//       formData.append("lastName", userData.lastName || "");
//       formData.append("email", userData.email || "");
//       formData.append("mobile", userData.mobile || "");
//       formData.append("gender", userData.gender || "");
//       formData.append("aadhar", userData.aadhar || "");

//       // Append Role Specifics
//       if (role !== 'citizen') {
//           formData.append("designation", userData.designation || "");
//           if (role === 'senior') {
//               formData.append("station", selectedStations.join(", "));
//           } else {
//               formData.append("station", userData.station || "");
//           }
//       }

//       // Handle Photo Logic
//       if (removePhoto) {
//           formData.append("removePhoto", "true");
//       } else if (newPhoto) {
//           formData.append("idPhoto", newPhoto);
//       }

//       try {
//           await axios.put(`${BASE_URL}/api/users/${id}/admin`, formData, config);
//           toast.success("User Updated Successfully!");
//           // Reload user to see changes
//           fetchUser(); 
//           setRemovePhoto(false);
//           setNewPhoto(null);
//           setPreviewPhoto(null);
//       } catch (error) {
//           console.error(error);
//           toast.error(error.response?.data?.message || "Update Failed");
//       } finally {
//           setLoading(false);
//       }
//   };

//   const handleDelete = async () => {
//       if(!window.confirm("Are you sure? This action cannot be undone.")) return;
      
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           await axios.delete(`${BASE_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//           toast.success("User Deleted");
//           navigate(`/admin/data/users/${role}`);
//       } catch (error) {
//           toast.error("Delete Failed");
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Navbar />
//       <Toaster />
//       <div className="max-w-4xl mx-auto pt-28 px-4 pb-20">
        
//         <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
//             <FaArrowLeft /> Back
//         </button>

//         <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 relative">
            
//             {/* Header / Photo */}
//             <div className="flex flex-col items-center mb-8">
//                 <div className="relative group cursor-pointer w-40 h-40 rounded-full overflow-hidden border-4 border-slate-600 shadow-xl bg-black">
//                     <img src={previewPhoto || userData.idPhoto} alt="Profile" className="w-full h-full object-cover" />
                    
//                     {/* Hover Overlay for Upload */}
//                     <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
//                         <FaCamera className="text-3xl text-white" />
//                     </div>
//                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
//                         setNewPhoto(e.target.files[0]);
//                         setRemovePhoto(false);
//                         setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
//                     }}/>
//                 </div>

//                 {/* Remove Photo Button */}
//                 <div className="mt-3 flex gap-3">
//                     {removePhoto ? (
//                         <button onClick={() => { setRemovePhoto(false); setPreviewPhoto(null); }} className="text-blue-400 text-xs flex items-center gap-1 hover:underline">
//                             <FaUndo /> Undo Remove
//                         </button>
//                     ) : (
//                         <button onClick={handleRemovePhoto} className="text-red-400 text-xs flex items-center gap-1 hover:underline">
//                             <FaTrash /> Remove Photo
//                         </button>
//                     )}
//                 </div>

//                 <h2 className="text-2xl font-bold mt-2">{userData.title} {userData.firstName} {userData.lastName}</h2>
//                 <span className="bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-full uppercase mt-1">{role}</span>
//             </div>

//             {/* Form Fields */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
//                 {/* Title Dropdown */}
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Prefix / Title</label>
//                     <select name="title" value={userData.title || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                         {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">First Name (Text Only)</label>
//                     <input name="firstName" value={userData.firstName || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Last Name (Text Only)</label>
//                     <input name="lastName" value={userData.lastName || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
                
//                 {/* Gender Dropdown */}
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Gender</label>
//                     <select name="gender" value={userData.gender || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                         <option value="">Select Gender</option>
//                         {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Email</label>
//                     <input name="email" value={userData.email || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Mobile (10 Digits)</label>
//                     <input name="mobile" maxLength="10" value={userData.mobile || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-1">Aadhaar (12 Digits)</label>
//                     <input name="aadhar" maxLength="12" value={userData.aadhar || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1" />
//                 </div>

//                 {/* ROLE SPECIFIC */}
//                 {role !== 'citizen' && (
//                     <>
//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-1">Designation</label>
//                             <select name="designation" value={userData.designation || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                                 <option value="">Select</option>
//                                 {designationsList.map(d => <option key={d} value={d}>{d}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-1">
//                                 {role === 'senior' ? "Jurisdiction (Multi-Select)" : "Police Station"}
//                             </label>
                            
//                             {role === 'senior' ? (
//                                 <div className="bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1">
//                                     <div className="flex flex-wrap gap-2 mb-2">
//                                         {selectedStations.map(s => (
//                                             <span key={s} className="bg-amber-500/20 text-amber-400 text-xs px-2 py-1 rounded flex items-center gap-1">
//                                                 {s} <FaTimes className="cursor-pointer hover:text-white" onClick={() => removeStationTag(s)} />
//                                             </span>
//                                         ))}
//                                     </div>
//                                     <select onChange={addStation} className="w-full bg-black/30 border border-slate-700 rounded p-2 text-sm text-gray-300">
//                                         <option value="">+ Add Station</option>
//                                         {stationsList.filter(s => !selectedStations.includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
//                                     </select>
//                                 </div>
//                             ) : (
//                                 <select name="station" value={userData.station || ""} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 mt-1 text-white">
//                                     <option value="">Select Station</option>
//                                     {stationsList.map(s => <option key={s} value={s}>{s}</option>)}
//                                 </select>
//                             )}
//                         </div>
//                     </>
//                 )}

//             </div>

//             {/* Actions */}
//             <div className="mt-8 flex gap-4">
//                 <button onClick={handleSave} disabled={loading} className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg">
//                     {loading ? "Saving..." : "Save Changes"}
//                 </button>
//                 <button onClick={handleDelete} className="bg-red-600/20 border border-red-600/50 hover:bg-red-600 text-red-400 hover:text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 transition-all">
//                     <FaTrash /> Delete User
//                 </button>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserProfile;








// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import Navbar from "../../components/Navbar";
// import { toast, Toaster } from "react-hot-toast";
// import axios from "axios";
// import { FaCamera, FaArrowLeft, FaTrash, FaTimes, FaUndo, FaSave } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// // Fallback data
// import { regularDesignations, seniorDesignations, policeStations } from "../../data/mockData"; 

// const AdminUserProfile = () => {
//   const { id, role } = useParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [userData, setUserData] = useState({});
//   const [previewPhoto, setPreviewPhoto] = useState(null);
//   const [newPhoto, setNewPhoto] = useState(null);
//   const [removePhoto, setRemovePhoto] = useState(false);

//   const [stationsList, setStationsList] = useState([]);
//   const [designationsList, setDesignationsList] = useState([]);
//   const [selectedStations, setSelectedStations] = useState([]);

//   const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];
//   const genders = ["Male", "Female", "Other"];

//   // ✅ Helper for Image URL (to handle backend uploads)
//   const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

//   useEffect(() => {
//     fetchMetadata();
//     fetchUser();
//   }, []);

//   const fetchMetadata = async () => {
//       try {
//           const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
//           setStationsList(data.stations.map(s => s.name));
//           setDesignationsList(role === 'senior' ? data.designations.senior : data.designations.regular);
//       } catch (err) {
//           setStationsList(policeStations);
//           setDesignationsList(role === 'senior' ? seniorDesignations : regularDesignations);
//       }
//   };

//   const fetchUser = async () => {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
//           const { data } = await axios.get(`${BASE_URL}/api/users/${id}`, config);
//           setUserData(data);
          
//           if(role === 'senior' && data.station) {
//               setSelectedStations(data.station.split(',').map(s => s.trim()).filter(s => s));
//           }
//       } catch (error) {
//           toast.error("Error loading user");
//       }
//   };

//   const handleChange = (e) => {
//       const { name, value } = e.target;
//       if (name === "mobile" || name === "aadhar") {
//           if (value && !/^\d+$/.test(value)) return; 
//       }
//       if (name === "firstName" || name === "lastName") {
//           if (value && !/^[a-zA-Z\s]*$/.test(value)) return; 
//       }
//       setUserData({ ...userData, [name]: value });
//   };

//   const validateForm = () => {
//       const { firstName, lastName, mobile, aadhar } = userData;
//       if (firstName && firstName.length < 2) return "First Name is too short.";
//       if (lastName && lastName.length < 2) return "Last Name is too short.";
//       if (mobile && mobile.length !== 10) return "Mobile Number must be exactly 10 digits.";
//       if (aadhar && aadhar.length !== 12) return "Aadhaar Number must be exactly 12 digits.";
//       return null;
//   };

//   const addStation = (e) => {
//       if(e.target.value && !selectedStations.includes(e.target.value)) {
//           setSelectedStations([...selectedStations, e.target.value]);
//       }
//   };
//   const removeStationTag = (s) => setSelectedStations(selectedStations.filter(st => st !== s));

//   const handleRemovePhoto = () => {
//       setRemovePhoto(true);
//       setPreviewPhoto("https://res.cloudinary.com/dukrcgv8s/image/upload/v1/default-avatar.png");
//       setNewPhoto(null);
//   };

//   const handleSave = async () => {
//       const error = validateForm();
//       if (error) return toast.error(error);

//       setLoading(true);
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" } };

//       const formData = new FormData();
//       formData.append("title", userData.title || "Mr.");
//       formData.append("firstName", userData.firstName || "");
//       formData.append("lastName", userData.lastName || "");
//       formData.append("email", userData.email || "");
//       formData.append("mobile", userData.mobile || "");
//       formData.append("gender", userData.gender || "");
//       formData.append("aadhar", userData.aadhar || "");

//       if (role !== 'citizen') {
//           formData.append("designation", userData.designation || "");
//           if (role === 'senior') {
//               formData.append("station", selectedStations.join(", "));
//           } else {
//               formData.append("station", userData.station || "");
//           }
//       }

//       if (removePhoto) {
//           formData.append("removePhoto", "true");
//       } else if (newPhoto) {
//           formData.append("idPhoto", newPhoto);
//       }

//       try {
//           await axios.put(`${BASE_URL}/api/users/${id}/admin`, formData, config);
//           toast.success("Profile Updated!");
//           fetchUser(); 
//           setRemovePhoto(false);
//           setNewPhoto(null);
//           setPreviewPhoto(null);
//       } catch (error) {
//           toast.error(error.response?.data?.message || "Update Failed");
//       } finally {
//           setLoading(false);
//       }
//   };

//   const handleDelete = async () => {
//       if(!window.confirm("Are you sure? This action cannot be undone.")) return;
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       try {
//           await axios.delete(`${BASE_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
//           toast.success("User Deleted");
//           navigate(`/admin/data/users/${role}`);
//       } catch (error) {
//           toast.error("Delete Failed");
//       }
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white font-sans">
//       <Navbar />
//       <Toaster position="top-center" />
      
//       {/* ✅ STICKY BACK BUTTON & HEADER */}
//       <div className="sticky top-[64px] z-40 bg-gray-900/95 backdrop-blur-md border-b border-white/5 shadow-xl py-3 px-4 md:px-8">
//           <div className="max-w-4xl mx-auto flex items-center justify-between">
//             <button 
//                 onClick={() => navigate(-1)} 
//                 className="bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-lg group flex items-center gap-2"
//             >
//                 <FaArrowLeft className="text-lg md:text-xl group-hover:-translate-x-1 transition-transform" />
//                 <span className="hidden md:inline text-sm font-bold">Back</span>
//             </button>
//             <h2 className="text-lg md:text-2xl font-bold text-gray-200">Edit Profile</h2>
//             <div className="w-10 md:w-20"></div> {/* Spacer for center alignment */}
//           </div>
//       </div>

//       <div className="max-w-4xl mx-auto px-4 pb-20 pt-6">
//         <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
            
//             {/* Background Glow */}
//             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

//             {/* Header / Photo */}
//             <div className="flex flex-col items-center mb-8 relative z-10">
//                 <div className="relative group cursor-pointer w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl bg-black">
//                     <img 
// src={previewPhoto ? previewPhoto : (userData.idPhoto ? getImageUrl(userData.idPhoto) : "https://placehold.co/150")}
//                         alt="Profile" 
//                         className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
//                     />
                    
//                     <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//                         <FaCamera className="text-3xl text-white drop-shadow-md" />
//                     </div>
//                     <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
//                         setNewPhoto(e.target.files[0]);
//                         setRemovePhoto(false);
//                         setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
//                     }}/>
//                 </div>

//                 <div className="mt-4 flex gap-3">
//                     {removePhoto ? (
//                         <button onClick={() => { setRemovePhoto(false); setPreviewPhoto(null); }} className="text-blue-400 text-xs font-bold flex items-center gap-1 hover:underline bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/30">
//                             <FaUndo /> Undo Remove
//                         </button>
//                     ) : (
//                         <button onClick={handleRemovePhoto} className="text-red-400 text-xs font-bold flex items-center gap-1 hover:underline bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/30">
//                             <FaTrash /> Remove Photo
//                         </button>
//                     )}
//                 </div>

//                 <h2 className="text-xl md:text-3xl font-bold mt-4 text-white text-center">{userData.title} {userData.firstName} {userData.lastName}</h2>
//                 <span className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full uppercase tracking-widest mt-2 border border-white/5 font-semibold shadow-sm">{role}</span>
//             </div>

//             {/* Form Fields - Better Mobile Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Title</label>
//                     <select name="title" value={userData.title || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
//                         {titles.map(t => <option key={t} value={t}>{t}</option>)}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">First Name</label>
//                     <input name="firstName" value={userData.firstName || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Last Name</label>
//                     <input name="lastName" value={userData.lastName || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
//                 </div>
                
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Gender</label>
//                     <select name="gender" value={userData.gender || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
//                         <option value="">Select Gender</option>
//                         {genders.map(g => <option key={g} value={g}>{g}</option>)}
//                     </select>
//                 </div>

//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Email</label>
//                     <input name="email" value={userData.email || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Mobile</label>
//                     <input name="mobile" maxLength="10" value={userData.mobile || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
//                 </div>
//                 <div>
//                     <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Aadhaar</label>
//                     <input name="aadhar" maxLength="12" value={userData.aadhar || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
//                 </div>

//                 {role !== 'citizen' && (
//                     <>
//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Designation</label>
//                             <select name="designation" value={userData.designation || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
//                                 <option value="">Select</option>
//                                 {designationsList.map(d => <option key={d} value={d}>{d}</option>)}
//                             </select>
//                         </div>

//                         <div>
//                             <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">
//                                 {role === 'senior' ? "Jurisdiction (Multi-Select)" : "Police Station"}
//                             </label>
                            
//                             {role === 'senior' ? (
//                                 <div className="bg-black/40 border border-white/10 rounded-xl p-3">
//                                     <div className="flex flex-wrap gap-2 mb-3">
//                                         {selectedStations.map(s => (
//                                             <span key={s} className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
//                                                 {s} <FaTimes className="cursor-pointer hover:text-white" onClick={() => removeStationTag(s)} />
//                                             </span>
//                                         ))}
//                                     </div>
//                                     <select onChange={addStation} className="w-full bg-transparent border-t border-white/10 pt-2 text-sm text-gray-300 outline-none cursor-pointer hover:text-white">
//                                         <option value="">+ Add Station to Jurisdiction</option>
//                                         {stationsList.filter(s => !selectedStations.includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
//                                     </select>
//                                 </div>
//                             ) : (
//                                 <select name="station" value={userData.station || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
//                                     <option value="">Select Station</option>
//                                     {stationsList.map(s => <option key={s} value={s}>{s}</option>)}
//                                 </select>
//                             )}
//                         </div>
//                     </>
//                 )}

//             </div>

//             {/* Actions */}
//             <div className="mt-10 flex flex-col md:flex-row gap-4">
//                 <button onClick={handleSave} disabled={loading} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
//                     {loading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span> : <><FaSave /> Save Changes</>}
//                 </button>
//                 <button onClick={handleDelete} className="bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
//                     <FaTrash /> Delete User
//                 </button>
//             </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminUserProfile;







import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { FaCamera, FaArrowLeft, FaTrash, FaTimes, FaUndo, FaSave } from "react-icons/fa";
import { BASE_URL } from "../../config";

// Fallback data
import { regularDesignations, seniorDesignations, policeStations } from "../../data/mockData"; 

const AdminUserProfile = () => {
  const { id, role } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);

  const [stationsList, setStationsList] = useState([]);
  const [designationsList, setDesignationsList] = useState([]);
  const [selectedStations, setSelectedStations] = useState([]);

  const titles = ["Mr.", "Mrs.", "Ms.", "Dr.", "Prof.", "Other"];
  const genders = ["Male", "Female", "Other"];

  // ✅ Helper for Image URL (to handle backend uploads)
  const getImageUrl = (path) => path?.startsWith("http") ? path : `${BASE_URL}/${path?.replace(/\\/g, "/")}`;

  useEffect(() => {
    fetchMetadata();
    fetchUser();
  }, []);

  const fetchMetadata = async () => {
      try {
          const { data } = await axios.get(`${BASE_URL}/api/metadata/all`);
          setStationsList(data.stations.map(s => s.name));
          setDesignationsList(role === 'senior' ? data.designations.senior : data.designations.regular);
      } catch (err) {
          setStationsList(policeStations);
          setDesignationsList(role === 'senior' ? seniorDesignations : regularDesignations);
      }
  };

  const fetchUser = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      try {
          const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
          const { data } = await axios.get(`${BASE_URL}/api/users/${id}`, config);
          setUserData(data);
          
          if(role === 'senior' && data.station) {
              setSelectedStations(data.station.split(',').map(s => s.trim()).filter(s => s));
          }
      } catch (error) {
          toast.error("Error loading user");
      }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "mobile" || name === "aadhar") {
          if (value && !/^\d+$/.test(value)) return; 
      }
      if (name === "firstName" || name === "lastName") {
          if (value && !/^[a-zA-Z\s]*$/.test(value)) return; 
      }
      setUserData({ ...userData, [name]: value });
  };

  const validateForm = () => {
      const { firstName, lastName, mobile, aadhar } = userData;
      if (firstName && firstName.length < 2) return "First Name is too short.";
      if (lastName && lastName.length < 2) return "Last Name is too short.";
      if (mobile && mobile.length !== 10) return "Mobile Number must be exactly 10 digits.";
      if (aadhar && aadhar.length !== 12) return "Aadhaar Number must be exactly 12 digits.";
      return null;
  };

  const addStation = (e) => {
      if(e.target.value && !selectedStations.includes(e.target.value)) {
          setSelectedStations([...selectedStations, e.target.value]);
      }
  };
  const removeStationTag = (s) => setSelectedStations(selectedStations.filter(st => st !== s));

  const handleRemovePhoto = () => {
      setRemovePhoto(true);
      setPreviewPhoto("https://res.cloudinary.com/dukrcgv8s/image/upload/v1/default-avatar.png");
      setNewPhoto(null);
  };

  const handleSave = async () => {
      const error = validateForm();
      if (error) return toast.error(error);

      setLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}`, "Content-Type": "multipart/form-data" } };

      const formData = new FormData();
      formData.append("title", userData.title || "Mr.");
      formData.append("firstName", userData.firstName || "");
      formData.append("lastName", userData.lastName || "");
      formData.append("email", userData.email || "");
      formData.append("mobile", userData.mobile || "");
      formData.append("gender", userData.gender || "");
      formData.append("aadhar", userData.aadhar || "");

      if (role !== 'citizen') {
          formData.append("designation", userData.designation || "");
          if (role === 'senior') {
              formData.append("station", selectedStations.join(", "));
          } else {
              formData.append("station", userData.station || "");
          }
      }

      if (removePhoto) {
          formData.append("removePhoto", "true");
      } else if (newPhoto) {
          formData.append("idPhoto", newPhoto);
      }

      try {
          await axios.put(`${BASE_URL}/api/users/${id}/admin`, formData, config);
          toast.success("Profile Updated!");
          fetchUser(); 
          setRemovePhoto(false);
          setNewPhoto(null);
          setPreviewPhoto(null);
      } catch (error) {
          toast.error(error.response?.data?.message || "Update Failed");
      } finally {
          setLoading(false);
      }
  };

  const handleDelete = async () => {
      if(!window.confirm("Are you sure? This action cannot be undone.")) return;
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      try {
          await axios.delete(`${BASE_URL}/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
          toast.success("User Deleted");
          navigate(`/admin/data/users/${role}`);
      } catch (error) {
          toast.error("Delete Failed");
      }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar />
      <Toaster position="top-center" />
      
      {/* ✅ FIX 1: ADDED pt-24 TO PUSH CONTENT BELOW NAVBAR */}
      <div className="pt-24 pb-10">
      
        {/* Sticky Header Section */}
        <div className="sticky top-[80px] z-30 bg-gray-900/95 backdrop-blur-md border-b border-white/5 shadow-xl py-3 px-4 md:px-8 mb-8">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <button 
                  onClick={() => navigate(-1)} 
                  className="bg-white/10 hover:bg-white/20 p-2 md:p-3 rounded-full backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-95 shadow-lg group flex items-center gap-2"
              >
                  <FaArrowLeft className="text-lg md:text-xl group-hover:-translate-x-1 transition-transform" />
                  <span className="hidden md:inline text-sm font-bold">Back</span>
              </button>
              <h2 className="text-lg md:text-2xl font-bold text-gray-200">Edit User Profile</h2>
              <div className="w-10 md:w-20"></div> {/* Spacer for center alignment */}
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-5 md:p-8 shadow-2xl relative overflow-hidden">
              
              {/* Background Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>

              {/* Header / Photo */}
              <div className="flex flex-col items-center mb-8 relative z-10">
                  <div className="relative group cursor-pointer w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-slate-700 shadow-2xl bg-black mt-4">
                      <img 
                          src={previewPhoto ? previewPhoto : (userData.idPhoto ? getImageUrl(userData.idPhoto) : "https://placehold.co/150")}
                          alt="Profile" 
                          className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                      />
                      
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <FaCamera className="text-3xl text-white drop-shadow-md" />
                      </div>
                      <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                          setNewPhoto(e.target.files[0]);
                          setRemovePhoto(false);
                          setPreviewPhoto(URL.createObjectURL(e.target.files[0]));
                      }}/>
                  </div>

                  <div className="mt-4 flex gap-3">
                      {removePhoto ? (
                          <button onClick={() => { setRemovePhoto(false); setPreviewPhoto(null); }} className="text-blue-400 text-xs font-bold flex items-center gap-1 hover:underline bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/30">
                              <FaUndo /> Undo Remove
                          </button>
                      ) : (
                          <button onClick={handleRemovePhoto} className="text-red-400 text-xs font-bold flex items-center gap-1 hover:underline bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/30">
                              <FaTrash /> Remove Photo
                          </button>
                      )}
                  </div>

                  {/* ✅ FIX 2: Added mt-4 to separate name from photo */}
                  <h2 className="text-2xl md:text-3xl font-bold mt-6 text-white text-center">{userData.title} {userData.firstName} {userData.lastName}</h2>
                  <span className="bg-white/10 text-gray-300 text-xs px-3 py-1 rounded-full uppercase tracking-widest mt-2 border border-white/5 font-semibold shadow-sm">{role}</span>
              </div>

              {/* Form Fields - Better Mobile Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  
                  <div>
                      <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Title</label>
                      <select name="title" value={userData.title || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
                          {titles.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                  </div>

                  <div>
                      <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">First Name</label>
                      <input name="firstName" value={userData.firstName || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
                  </div>
                  <div>
                      <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Last Name</label>
                      <input name="lastName" value={userData.lastName || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
                  </div>
                  
                  <div>
                      <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Gender</label>
                      <select name="gender" value={userData.gender || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
                          <option value="">Select Gender</option>
                          {genders.map(g => <option key={g} value={g}>{g}</option>)}
                      </select>
                  </div>

                  <div>
                      <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Email</label>
                      <input name="email" value={userData.email || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
                  </div>
                  <div>
                      <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Mobile</label>
                      <input name="mobile" maxLength="10" value={userData.mobile || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
                  </div>
                  <div>
                      <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Aadhaar</label>
                      <input name="aadhar" maxLength="12" value={userData.aadhar || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all" />
                  </div>

                  {role !== 'citizen' && (
                      <>
                          <div>
                              <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">Designation</label>
                              <select name="designation" value={userData.designation || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
                                  <option value="">Select</option>
                                  {designationsList.map(d => <option key={d} value={d}>{d}</option>)}
                              </select>
                          </div>

                          <div>
                              <label className="text-xs text-gray-400 uppercase font-bold ml-2 mb-1 block">
                                  {role === 'senior' ? "Jurisdiction (Multi-Select)" : "Police Station"}
                              </label>
                              
                              {role === 'senior' ? (
                                  <div className="bg-black/40 border border-white/10 rounded-xl p-3">
                                      <div className="flex flex-wrap gap-2 mb-3">
                                          {selectedStations.map(s => (
                                              <span key={s} className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                                                  {s} <FaTimes className="cursor-pointer hover:text-white" onClick={() => removeStationTag(s)} />
                                              </span>
                                          ))}
                                      </div>
                                      <select onChange={addStation} className="w-full bg-transparent border-t border-white/10 pt-2 text-sm text-gray-300 outline-none cursor-pointer hover:text-white">
                                          <option value="">+ Add Station to Jurisdiction</option>
                                          {stationsList.filter(s => !selectedStations.includes(s)).map(s => <option key={s} value={s}>{s}</option>)}
                                      </select>
                                  </div>
                              ) : (
                                  <select name="station" value={userData.station || ""} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-blue-500/50 transition-all">
                                      <option value="">Select Station</option>
                                      {stationsList.map(s => <option key={s} value={s}>{s}</option>)}
                                  </select>
                              )}
                          </div>
                      </>
                  )}

              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col md:flex-row gap-4">
                  <button onClick={handleSave} disabled={loading} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2">
                      {loading ? <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></span> : <><FaSave /> Save Changes</>}
                  </button>
                  <button onClick={handleDelete} className="bg-red-500/10 border border-red-500/30 hover:bg-red-500 hover:text-white text-red-400 font-bold py-3.5 px-8 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95">
                      <FaTrash /> Delete User
                  </button>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserProfile;