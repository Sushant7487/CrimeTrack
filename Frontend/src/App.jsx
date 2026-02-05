
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











import React, { useEffect } from "react"; // ✅ Imported useEffect
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; 
import { io } from "socket.io-client"; // ✅ Imported socket.io-client
import ComingSoon from "./pages/ComingSoon";

// Common Pages
import Navbar from "./components/Navbar"; 
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LegalAid from "./pages/LegalAid"; 

// Dashboards
import UserDashboard from "./pages/UserDashboard";
import PoliceDashboard from "./pages/PoliceDashboard";
import SeniorDashboard from "./pages/SeniorDashboard";

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

// User Dashboard Components
import UserCaseFile from "./pages/UserCaseFile"; 
import UserChatDashboard from "./pages/UserChatDashboard"; 

// Chat Window (Shared by everyone)
import DirectChatWindow from "./pages/DirectChatWindow";

const App = () => {

  // ✅ GLOBAL SOCKET LOGIC (Fix for Status Issue)
  // This ensures that as long as the website is open, the user is "Online".
  // When they close the tab, the socket disconnects and Backend marks them "Offline".
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    
    if (userInfo && userInfo._id) {
      const socket = io("https://crimetrack-api.onrender.com"); // Connect to backend
      socket.emit("register_officer", userInfo._id); // Register presence

      return () => {
        socket.disconnect(); // Cleanup on unmount
      };
    }
  }, []);

  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000, 
          style: {
            background: '#1F2937', 
            color: '#fff', 
            padding: '16px',
            borderRadius: '10px',
            border: '1px solid #374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
          },
          success: { iconTheme: { primary: '#10B981', secondary: 'white' } },
          error: { iconTheme: { primary: '#EF4444', secondary: 'white' } },
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
          
          {/* --- MAIN USER DASHBOARD ROUTES --- */}
          <Route path="/user" element={<UserDashboard defaultTab="menu" />} />
          <Route path="/user/report" element={<UserDashboard defaultTab="report" />} />
          <Route path="/user/track" element={<UserDashboard defaultTab="status" />} />
          <Route path="/user/history" element={<UserDashboard defaultTab="my_complaints" />} />
          
          <Route path="/user/case-file/:id" element={<UserCaseFile />} />
          <Route path="/user/messages" element={<UserChatDashboard />} />

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

          {/* --- SENIOR ROUTES --- */}
          <Route path="/senior" element={<SeniorDashboard defaultTab="menu" />} />
          <Route path="/senior/complaints" element={<SeniorDashboard defaultTab="complaints" />} />
          <Route path="/senior/case-file/:id" element={<SeniorCaseFile />} />
          
          <Route path="/senior/view-complaints" element={<SeniorViewComplaints />} /> 
          <Route path="/senior/manage-officers" element={<SeniorManageOfficers />} />
          <Route path="/senior/citizen-connect" element={<CitizenConnect />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          
          {/* --- SHARED CHAT --- */}
          <Route path="/chat/:partnerId" element={<DirectChatWindow />} />
          <Route path="/citizen/chat/:partnerId" element={<DirectChatWindow />} />

          {/* Fallback Routes */}
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