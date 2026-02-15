
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; // ✅ Imported Here

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window (Shared by everyone)
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {
//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           {/* ✅ LEGAL AID ROUTES (Added BOTH versions to fix black screen) */}
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
          
//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
          
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
          
//           {/* --- SHARED CHAT --- */}
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />

//           {/* Fallback Routes */}
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* ✅ 404 ERROR PAGE (Agar koi galat link open kare toh ye dikhega) */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;











// import React, { useEffect } from "react"; // ✅ Imported useEffect
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client"; // ✅ Imported socket.io-client
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window (Shared by everyone)
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {

//   // ✅ GLOBAL SOCKET LOGIC (Fix for Status Issue)
//   // This ensures that as long as the website is open, the user is "Online".
//   // When they close the tab, the socket disconnects and Backend marks them "Offline".
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); // Connect to backend
//       socket.emit("register_officer", userInfo._id); // Register presence

//       return () => {
//         socket.disconnect(); // Cleanup on unmount
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
          
//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
          
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
          
//           {/* --- SHARED CHAT --- */}
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />

//           {/* Fallback Routes */}
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;













// import React, { useEffect } from "react"; // ✅ Imported useEffect
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client"; // ✅ Imported socket.io-client
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // ✅ NEW: Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window (Shared by everyone)
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {

//   // ✅ GLOBAL SOCKET LOGIC (Fix for Status Issue)
//   // This ensures that as long as the website is open, the user is "Online".
//   // When they close the tab, the socket disconnects and Backend marks them "Offline".
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); // Connect to backend
//       socket.emit("register_officer", userInfo._id); // Register presence

//       return () => {
//         socket.disconnect(); // Cleanup on unmount
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
          
//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
          
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />

//           {/* ✅ NEW: ONLINE MEETING ROUTES (Police) */}
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
          
//           {/* ✅ NEW: ONLINE MEETING ROUTES (Senior - Reusing Police Components) */}
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* ✅ NEW: ACTUAL VIDEO MEETING ROOM (Hidden from Nav) */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />

//           {/* --- SHARED CHAT --- */}
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />

//           {/* Fallback Routes */}
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;










// import React, { useEffect } from "react"; // ✅ Imported useEffect
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client"; // ✅ Imported socket.io-client
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // ✅ NEW: Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window (Shared by everyone)
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {

//   // ✅ GLOBAL SOCKET LOGIC (Fix for Status Issue)
//   // This ensures that as long as the website is open, the user is "Online".
//   // When they close the tab, the socket disconnects and Backend marks them "Offline".
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); // Connect to backend
//       socket.emit("register_officer", userInfo._id); // Register presence

//       return () => {
//         socket.disconnect(); // Cleanup on unmount
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
          
//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />
          
//           {/* ✅ ADDED: Route for Citizen Meeting List (Fixes 404 Error) */}
//           <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
          
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />

//           {/* ✅ NEW: ONLINE MEETING ROUTES (Police) */}
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
          
//           {/* ✅ NEW: ONLINE MEETING ROUTES (Senior - Reusing Police Components) */}
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* ✅ NEW: ACTUAL VIDEO MEETING ROOM (Hidden from Nav) */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />

//           {/* --- SHARED CHAT --- */}
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />

//           {/* Fallback Routes */}
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;






// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client";
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // ✅ NEW: Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window (Shared by everyone)
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {

//   // ✅ GLOBAL SOCKET LOGIC (Fix for Status Issue)
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); // Connect to backend
//       socket.emit("register_officer", userInfo._id); // Register presence

//       return () => {
//         socket.disconnect(); // Cleanup on unmount
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
          
//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />
          
//           {/* ✅ ADDED: Route for Citizen Meeting List */}
//           <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
          
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />

//           {/* ✅ NEW: ONLINE MEETING ROUTES (Police) - DISTINCT ROUTES */}
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
          
//           {/* ✅ NEW: ONLINE MEETING ROUTES (Senior) - DISTINCT ROUTES */}
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* ✅ NEW: ACTUAL VIDEO MEETING ROOM */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />

//           {/* --- SHARED CHAT --- */}
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />

//           {/* Fallback Routes */}
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;


















// //changes from 09 feb 
// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client";
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 
// import Profile from "./pages/Profile"; // ✅ NEW: Imported Profile Page

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // ✅ NEW: Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window (Shared by everyone)
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {

//   // ✅ GLOBAL SOCKET LOGIC (Fix for Status Issue)
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); // Connect to backend
//       socket.emit("register_officer", userInfo._id); // Register presence

//       return () => {
//         socket.disconnect(); // Cleanup on unmount
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />

//           {/* ✅ NEW: Profile Page Route (Secure Edit) */}
//           <Route path="/profile" element={<Profile />} />
          
//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />
          
//           {/* ✅ ADDED: Route for Citizen Meeting List */}
//           <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
          
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />

//           {/* ✅ NEW: ONLINE MEETING ROUTES (Police) - DISTINCT ROUTES */}
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
          
//           {/* ✅ NEW: ONLINE MEETING ROUTES (Senior) - DISTINCT ROUTES */}
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* ✅ NEW: ACTUAL VIDEO MEETING ROOM */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />

//           {/* --- SHARED CHAT --- */}
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />

//           {/* Fallback Routes */}
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

























// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client";
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 
// import Profile from "./pages/Profile"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";
// import AdminDashboard from "./pages/AdminDashboard"; // ✅ NEW: Imported Admin Dashboard

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {

//   // Global Socket Logic
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); 
//       socket.emit("register_officer", userInfo._id); 

//       return () => {
//         socket.disconnect(); 
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
//           <Route path="/profile" element={<Profile />} />
          
//           {/* --- 🛡️ ADMIN ROUTES (NEW) --- */}
//           <Route path="/admin" element={<AdminDashboard defaultTab="menu" />} />
//           <Route path="/admin/logs" element={<AdminDashboard defaultTab="logs" />} />
          
//           {/* Data Manipulation */}
//           <Route path="/admin/data" element={<AdminDashboard defaultTab="data" />} />
//           <Route path="/admin/data/users" element={<AdminDashboard defaultTab="data_users" />} />
//           <Route path="/admin/data/designations" element={<AdminDashboard defaultTab="data_designations" />} />
//           <Route path="/admin/data/sections" element={<AdminDashboard defaultTab="data_sections" />} />
//           <Route path="/admin/data/stations" element={<AdminDashboard defaultTab="data_stations" />} />

//           {/* Help Section */}
//           <Route path="/admin/help" element={<AdminDashboard defaultTab="help" />} />

//           {/* Forms Manipulation */}
//           <Route path="/admin/forms" element={<AdminDashboard defaultTab="forms" />} />
//           <Route path="/admin/forms/signup" element={<AdminDashboard defaultTab="forms_signup" />} />
//           <Route path="/admin/forms/fir" element={<AdminDashboard defaultTab="forms_fir" />} />
//           <Route path="/admin/forms/ncr" element={<AdminDashboard defaultTab="forms_ncr" />} />

//           {/* Home Page Section */}
//           <Route path="/admin/home-content" element={<AdminDashboard defaultTab="home_content" />} />

//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />
//           <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* --- SHARED ROUTES --- */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;








// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client";
// import ComingSoon from "./pages/ComingSoon";

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 
// import Profile from "./pages/Profile"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";
// import AdminDashboard from "./pages/AdminDashboard"; // ✅ Admin Dashboard Shell

// // ✅ Admin Specific Pages
// import AdminUserDataMenu from "./pages/admin/AdminUserDataMenu";
// import AdminUserList from "./pages/admin/AdminUserList";
// import AdminUserProfile from "./pages/admin/AdminUserProfile";

// // ✅ NEW: Admin Data Management Pages
// import ManageDesignations from "./pages/admin/ManageDesignations";
// import ManageStations from "./pages/admin/ManageStations";
// import ManageSections from "./pages/admin/ManageSections";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window
// import DirectChatWindow from "./pages/DirectChatWindow";

// const App = () => {

//   // Global Socket Logic
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); 
//       socket.emit("register_officer", userInfo._id); 

//       return () => {
//         socket.disconnect(); 
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
//           <Route path="/profile" element={<Profile />} />
          
//           {/* --- 🛡️ ADMIN ROUTES (Full Structure) --- */}
//           <Route path="/admin" element={<AdminDashboard defaultTab="menu" />} />
//           <Route path="/admin/logs" element={<AdminDashboard defaultTab="logs" />} />
          
//           {/* Data Manipulation Main Menu */}
//           <Route path="/admin/data" element={<AdminDashboard defaultTab="data" />} />
          
//           {/* User Data Flow */}
//           <Route path="/admin/data/users" element={<AdminUserDataMenu />} />
//           <Route path="/admin/data/users/:role" element={<AdminUserList />} />
//           <Route path="/admin/data/users/:role/:id" element={<AdminUserProfile />} />

//           {/* ✅ NEW: Dynamic Data Management Pages */}
//           <Route path="/admin/data/designations" element={<ManageDesignations />} />
//           <Route path="/admin/data/sections" element={<ManageSections />} />
//           <Route path="/admin/data/stations" element={<ManageStations />} />

//           {/* Help Section */}
//           <Route path="/admin/help" element={<AdminDashboard defaultTab="help" />} />

//           {/* Forms Manipulation */}
//           <Route path="/admin/forms" element={<AdminDashboard defaultTab="forms" />} />
//           <Route path="/admin/forms/signup" element={<AdminDashboard defaultTab="forms_signup" />} />
//           <Route path="/admin/forms/fir" element={<AdminDashboard defaultTab="forms_fir" />} />
//           <Route path="/admin/forms/ncr" element={<AdminDashboard defaultTab="forms_ncr" />} />

//           {/* Home Page Section */}
//           <Route path="/admin/home-content" element={<AdminDashboard defaultTab="home_content" />} />

//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />
//           <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* --- SHARED ROUTES --- */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;



// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // ✅ Added Navigate
// import { Toaster } from "react-hot-toast"; 
// import { io } from "socket.io-client";
// import ComingSoon from "./pages/ComingSoon"; 

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 
// import Profile from "./pages/Profile"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";
// import AdminDashboard from "./pages/AdminDashboard"; 

// // Admin Specific Pages
// import AdminUserDataMenu from "./pages/admin/AdminUserDataMenu";
// import AdminUserList from "./pages/admin/AdminUserList";
// import AdminUserProfile from "./pages/admin/AdminUserProfile";

// // Admin Data Management Pages
// import ManageDesignations from "./pages/admin/ManageDesignations";
// import ManageStations from "./pages/admin/ManageStations";
// import ManageSections from "./pages/admin/ManageSections";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window
// import DirectChatWindow from "./pages/DirectChatWindow";

// // ✅ ADDED MISSING IMPORT
// import NoticeLayout from "./components/common/NoticeLayout"; 

// const App = () => {

//   // Global Socket Logic
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); 
//       socket.emit("register_officer", userInfo._id); 

//       return () => {
//         socket.disconnect(); 
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       <Toaster 
//         position="top-right"
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//           },
//           success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
//           error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
//           <Route path="/profile" element={<Profile />} />
          
//           {/* --- 🛡️ ADMIN ROUTES (Full Structure) --- */}
//           <Route path="/admin" element={<AdminDashboard defaultTab="menu" />} />
//           <Route path="/admin/logs" element={<AdminDashboard defaultTab="logs" />} />
          
//           <Route path="/admin/home_content" element={<AdminDashboard defaultTab="home_content" />} />

//           {/* Data Manipulation Main Menu */}
//           <Route path="/admin/data" element={<AdminDashboard defaultTab="data" />} />
          
//           {/* User Data Flow */}
//           <Route path="/admin/data/users" element={<AdminUserDataMenu />} />
//           <Route path="/admin/data/users/:role" element={<AdminUserList />} />
//           <Route path="/admin/data/users/:role/:id" element={<AdminUserProfile />} />

//           {/* Dynamic Data Management Pages */}
//           <Route path="/admin/data/designations" element={<ManageDesignations />} />
//           <Route path="/admin/data/sections" element={<ManageSections />} />
//           <Route path="/admin/data/stations" element={<ManageStations />} />

//           {/* Help Section */}
//           <Route path="/admin/help" element={<AdminDashboard defaultTab="help" />} />

//           {/* Forms Manipulation */}
//           <Route path="/admin/forms" element={<AdminDashboard defaultTab="forms" />} />
//           <Route path="/admin/forms/signup" element={<AdminDashboard defaultTab="forms_signup" />} />
//           <Route path="/admin/forms/fir" element={<AdminDashboard defaultTab="forms_fir" />} />
//           <Route path="/admin/forms/ncr" element={<AdminDashboard defaultTab="forms_ncr" />} />

//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />
//           <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* ✅ OFFICIAL DOCUMENTS ROUTES */}
//           <Route path="/official-docs/:section" element={<NoticeLayout />} />
//           <Route path="/official-docs" element={<Navigate to="/official-docs/inbox" replace />} />

//           {/* --- SHARED ROUTES --- */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
















// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
// import { Toaster } from "react-hot-toast"; // ✅ Ensure this is imported
// import { io } from "socket.io-client";
// import ComingSoon from "./pages/ComingSoon"; 

// // Common Pages
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import LegalAid from "./pages/LegalAid"; 
// import Profile from "./pages/Profile"; 

// // Dashboards
// import UserDashboard from "./pages/UserDashboard";
// import PoliceDashboard from "./pages/PoliceDashboard";
// import SeniorDashboard from "./pages/SeniorDashboard";
// import AdminDashboard from "./pages/AdminDashboard"; 

// // Admin Specific Pages
// import AdminUserDataMenu from "./pages/admin/AdminUserDataMenu";
// import AdminUserList from "./pages/admin/AdminUserList";
// import AdminUserProfile from "./pages/admin/AdminUserProfile";

// // Admin Data Management Pages
// import ManageDesignations from "./pages/admin/ManageDesignations";
// import ManageStations from "./pages/admin/ManageStations";
// import ManageSections from "./pages/admin/ManageSections";

// // Senior Dashboard Components
// import SeniorManageOfficers from "./pages/SeniorManageOfficers";
// import SeniorViewComplaints from "./pages/SeniorViewComplaints";
// import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// // Police Dashboard Components
// import FileFIR from "./components/policeDashboard/FileFIR";
// import PastCrimes from "./components/policeDashboard/PastCrimes";
// import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
// import FaceDetection from "./components/policeDashboard/FaceDetection";
// import CaseReview from "./components/policeDashboard/CaseReview"; 
// import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
// import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// // Online Meeting Components
// import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
// import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
// import MeetingList from "./components/onlineMeeting/MeetingList";
// import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// // User Dashboard Components
// import UserCaseFile from "./pages/UserCaseFile"; 
// import UserChatDashboard from "./pages/UserChatDashboard"; 

// // Chat Window
// import DirectChatWindow from "./pages/DirectChatWindow";

// // ✅ ADDED MISSING IMPORT
// import NoticeLayout from "./components/common/NoticeLayout"; 

// const App = () => {

//   // Global Socket Logic
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
//     if (userInfo && userInfo._id) {
//       const socket = io("https://crimetrack-api.onrender.com"); 
//       socket.emit("register_officer", userInfo._id); 

//       return () => {
//         socket.disconnect(); 
//       };
//     }
//   }, []);

//   return (
//     <Router>
//       {/* ✅ GLOBAL TOASTER COMPONENT - MUST BE HERE */}
//       <Toaster 
//         position="top-center" // Changed to top-center for better visibility
//         reverseOrder={false}
//         toastOptions={{
//           duration: 4000, 
//           style: {
//             background: '#1F2937', 
//             color: '#fff', 
//             padding: '16px',
//             borderRadius: '10px',
//             border: '1px solid #374151',
//             boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
//             fontSize: '14px',
//             fontWeight: 'bold',
//           },
//           success: { 
//             iconTheme: { primary: '#10B981', secondary: 'white' },
//             style: { border: '1px solid #10B981' }
//           },
//           error: { 
//             iconTheme: { primary: '#EF4444', secondary: 'white' },
//             style: { border: '1px solid #EF4444' }
//           },
//         }} 
//       />
      
//       <div className="flex flex-col min-h-screen bg-gray-900">
//         <Routes>
//           {/* --- PUBLIC ROUTES --- */}
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
          
//           <Route path="/legal-aid" element={<LegalAid />} />
//           <Route path="/legalaid" element={<LegalAid />} />
//           <Route path="/profile" element={<Profile />} />
          
//           {/* --- 🛡️ ADMIN ROUTES (Full Structure) --- */}
//           <Route path="/admin" element={<AdminDashboard defaultTab="menu" />} />
//           <Route path="/admin/logs" element={<AdminDashboard defaultTab="logs" />} />
          
//           <Route path="/admin/home_content" element={<AdminDashboard defaultTab="home_content" />} />

//           {/* Data Manipulation Main Menu */}
//           <Route path="/admin/data" element={<AdminDashboard defaultTab="data" />} />
          
//           {/* User Data Flow */}
//           <Route path="/admin/data/users" element={<AdminUserDataMenu />} />
//           <Route path="/admin/data/users/:role" element={<AdminUserList />} />
//           <Route path="/admin/data/users/:role/:id" element={<AdminUserProfile />} />

//           {/* Dynamic Data Management Pages */}
//           <Route path="/admin/data/designations" element={<ManageDesignations />} />
//           <Route path="/admin/data/sections" element={<ManageSections />} />
//           <Route path="/admin/data/stations" element={<ManageStations />} />

//           {/* Help Section */}
//           <Route path="/admin/help" element={<AdminDashboard defaultTab="help" />} />

//           {/* Forms Manipulation */}
//           <Route path="/admin/forms" element={<AdminDashboard defaultTab="forms" />} />
//           <Route path="/admin/forms/signup" element={<AdminDashboard defaultTab="forms_signup" />} />
//           <Route path="/admin/forms/fir" element={<AdminDashboard defaultTab="forms_fir" />} />
//           <Route path="/admin/forms/ncr" element={<AdminDashboard defaultTab="forms_ncr" />} />

//           {/* --- MAIN USER DASHBOARD ROUTES --- */}
//           <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
//           <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
//           <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
//           <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
//           <Route path="/user/case-file/:id" element={<UserCaseFile />} />
//           <Route path="/user/messages" element={<UserChatDashboard />} />
//           <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

//           {/* --- POLICE ROUTES --- */}
//           <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
//           <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
//           <Route path="/police/connect" element={<PoliceConnect />} />
//           <Route path="/police/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/case-review/:id" element={<CaseReview />} />
//           <Route path="/file-fir" element={<FileFIR />} />
//           <Route path="/history" element={<PastCrimes />} />
//           <Route path="/suspicious" element={<SuspiciousActivity />} />
//           <Route path="/face-detect" element={<FaceDetection />} />
//           <Route path="/police/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/police/meeting/list" element={<MeetingList />} />

//           {/* --- SENIOR ROUTES --- */}
//           <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
//           <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
//           <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
//           <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
//           <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
//           <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
//           <Route path="/coming-soon" element={<ComingSoon />} />
//           <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
//           <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
//           <Route path="/senior/meeting/list" element={<MeetingList />} />

//           {/* ✅ OFFICIAL DOCUMENTS ROUTES */}
//           <Route path="/official-docs/:section" element={<NoticeLayout />} />
//           <Route path="/official-docs" element={<Navigate to="/official-docs/inbox" replace />} />

//           {/* --- SHARED ROUTES --- */}
//           <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />
//           <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />
//           <Route path="/track-location" element={<PoliceDashboard />} />
//           <Route path="/contacts" element={<PoliceDashboard />} />

//           {/* 404 ERROR PAGE */}
//           <Route path="*" element={
//             <div className="flex flex-col items-center justify-center min-h-screen text-white">
//               <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
//               <p className="text-gray-400">Please check the URL or go back home.</p>
//             </div>
//           } />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;












import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import { Toaster } from "react-hot-toast"; 
import { io } from "socket.io-client";
import ComingSoon from "./pages/ComingSoon"; 

// Common Pages
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LegalAid from "./pages/LegalAid"; 
import Profile from "./pages/Profile"; 

// Dashboards
import UserDashboard from "./pages/UserDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import SeniorDashboard from "./pages/SeniorDashboard";
import AdminDashboard from "./pages/AdminDashboard"; 

// Admin Specific Pages
import AdminUserDataMenu from "./pages/admin/AdminUserDataMenu";
import AdminUserList from "./pages/admin/AdminUserList";
import AdminUserProfile from "./pages/admin/AdminUserProfile";

// Admin Data Management Pages
import ManageDesignations from "./pages/admin/ManageDesignations";
import ManageStations from "./pages/admin/ManageStations";
import ManageSections from "./pages/admin/ManageSections";

// Senior Dashboard Components
import SeniorManageOfficers from "./pages/SeniorManageOfficers";
import SeniorViewComplaints from "./pages/SeniorViewComplaints";
import SeniorCaseFile from "./components/policeDashboard/SeniorCaseFile"; 

// Police Dashboard Components
import FileFIR from "./components/policeDashboard/FileFIR";
import PastCrimes from "./components/policeDashboard/PastCrimes";
import SuspiciousActivity from "./components/policeDashboard/SuspiciousActivity";
import FaceDetection from "./components/policeDashboard/FaceDetection";
import CaseReview from "./components/policeDashboard/CaseReview"; 
import PoliceConnect from "./components/policeDashboard/PoliceConnect"; 
import CitizenConnect from "./components/policeDashboard/CitizenConnect"; 

// ✅ NEW: Live Tracking Page
import LiveTracking from "./pages/LiveTracking";

// Online Meeting Components
import MeetingDashboard from "./components/onlineMeeting/MeetingDashboard";
import ScheduleMeeting from "./components/onlineMeeting/ScheduleMeeting";
import MeetingList from "./components/onlineMeeting/MeetingList";
import JitsiRoom from "./components/onlineMeeting/JitsiRoom";

// User Dashboard Components
import UserCaseFile from "./pages/UserCaseFile"; 
import UserChatDashboard from "./pages/UserChatDashboard"; 

// Chat Window
import DirectChatWindow from "./pages/DirectChatWindow";

// ✅ ADDED MISSING IMPORT
import NoticeLayout from "./components/common/NoticeLayout"; 

const App = () => {

  // Global Socket Logic
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (userInfo && userInfo._id) {
      const socket = io("https://crimetrack-api.onrender.com"); 
      socket.emit("register_officer", userInfo._id); 

      return () => {
        socket.disconnect(); 
      };
    }
  }, []);

  return (
    <Router>
      {/* ✅ GLOBAL TOASTER COMPONENT */}
      <Toaster 
        position="top-center" 
        reverseOrder={false}
        toastOptions={{
          duration: 4000, 
          style: {
            background: '#1F2937', 
            color: '#fff', 
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid #374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
            fontSize: '14px',
            fontWeight: 'bold',
          },
          success: { 
            iconTheme: { primary: '#10B981', secondary: 'white' },
            style: { border: '1px solid #10B981' }
          },
          error: { 
            iconTheme: { primary: '#EF4444', secondary: 'white' },
            style: { border: '1px solid #EF4444' }
          },
        }} 
      />
      
      <div className="flex flex-col min-h-screen bg-gray-900">
        <Routes>
          {/* --- PUBLIC ROUTES --- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          
          <Route path="/legal-aid" element={<LegalAid />} />
          <Route path="/legalaid" element={<LegalAid />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* --- 🛡️ ADMIN ROUTES (Full Structure) --- */}
          <Route path="/admin" element={<AdminDashboard defaultTab="menu" />} />
          <Route path="/admin/logs" element={<AdminDashboard defaultTab="logs" />} />
          
          <Route path="/admin/home_content" element={<AdminDashboard defaultTab="home_content" />} />

          {/* Data Manipulation Main Menu */}
          <Route path="/admin/data" element={<AdminDashboard defaultTab="data" />} />
          
          {/* User Data Flow */}
          <Route path="/admin/data/users" element={<AdminUserDataMenu />} />
          <Route path="/admin/data/users/:role" element={<AdminUserList />} />
          <Route path="/admin/data/users/:role/:id" element={<AdminUserProfile />} />

          {/* Dynamic Data Management Pages */}
          <Route path="/admin/data/designations" element={<ManageDesignations />} />
          <Route path="/admin/data/sections" element={<ManageSections />} />
          <Route path="/admin/data/stations" element={<ManageStations />} />

          {/* Help Section */}
          <Route path="/admin/help" element={<AdminDashboard defaultTab="help" />} />

          {/* Forms Manipulation */}
          <Route path="/admin/forms" element={<AdminDashboard defaultTab="forms" />} />
          <Route path="/admin/forms/signup" element={<AdminDashboard defaultTab="forms_signup" />} />
          <Route path="/admin/forms/fir" element={<AdminDashboard defaultTab="forms_fir" />} />
          <Route path="/admin/forms/ncr" element={<AdminDashboard defaultTab="forms_ncr" />} />

          {/* --- MAIN USER DASHBOARD ROUTES --- */}
          <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
          <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
          <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
          <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          <Route path="/user/case-file/:id" element={<UserCaseFile />} />
          <Route path="/user/messages" element={<UserChatDashboard />} />
          <Route path="/user/meetings" element={<UserDashboard defaultTab="meetings" />} />

          {/* --- POLICE ROUTES --- */}
          <Route path="/police" element={<PoliceDashboard defaultTab="menu" />} />
          <Route path="/police/complaints" element={<PoliceDashboard defaultTab="complaints" />} />
          <Route path="/police/connect" element={<PoliceConnect />} />
          <Route path="/police/citizen-connect" element={<CitizenConnect />} />
          <Route path="/case-review/:id" element={<CaseReview />} />
          <Route path="/file-fir" element={<FileFIR />} />
          <Route path="/history" element={<PastCrimes />} />
          <Route path="/suspicious" element={<SuspiciousActivity />} />
          <Route path="/face-detect" element={<FaceDetection />} />
          <Route path="/police/online-meeting" element={<MeetingDashboard />} />
          <Route path="/police/meeting/citizen" element={<ScheduleMeeting />} />
          <Route path="/police/meeting/police" element={<ScheduleMeeting />} />
          <Route path="/police/meeting/list" element={<MeetingList />} />

          {/* ✅ LIVE TRACKING ROUTE */}
          <Route path="/police/live-tracking/:id" element={<LiveTracking />} />

          {/* --- SENIOR ROUTES --- */}
          <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
          <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
          <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
          <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
          <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/senior/online-meeting" element={<MeetingDashboard />} />
          <Route path="/senior/meeting/citizen" element={<ScheduleMeeting />} />
          <Route path="/senior/meeting/police" element={<ScheduleMeeting />} />
          <Route path="/senior/meeting/list" element={<MeetingList />} />

          {/* ✅ OFFICIAL DOCUMENTS ROUTES */}
          <Route path="/official-docs/:section" element={<NoticeLayout />} />
          <Route path="/official-docs" element={<Navigate to="/official-docs/inbox" replace />} />

          {/* --- SHARED ROUTES --- */}
          <Route path="/meeting/room/:roomName" element={<JitsiRoom />} />
          <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
          <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />
          <Route path="/track-location" element={<PoliceDashboard />} />
          <Route path="/contacts" element={<PoliceDashboard />} />

          {/* 404 ERROR PAGE */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center min-h-screen text-white">
              <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
              <p className="text-gray-400">Please check the URL or go back home.</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default App;