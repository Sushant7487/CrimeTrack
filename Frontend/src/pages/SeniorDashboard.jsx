
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

// Components
import SeniorMenu from "../components/seniorDashboard/SeniorMenu"; 
import SeniorViewComplaints from "./SeniorViewComplaints"; 
import SeniorManageOfficers from "./SeniorManageOfficers"; 
import PoliceConnect from "../components/policeDashboard/PoliceConnect"; 

import FileFIR from "../components/policeDashboard/FileFIR";
import PastCrimes from "../components/policeDashboard/PastCrimes";
import SuspiciousActivity from "../components/policeDashboard/SuspiciousActivity";
import FaceDetection from "../components/policeDashboard/FaceDetection";
import SkeletonLoader from "../components/common/SkeletonLoader";

// ✅ Accept defaultTab prop
const SeniorDashboard = ({ defaultTab = "menu" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [user, setUser] = useState({ name: "Senior Official", designation: "IPS" });
  const [loading, setLoading] = useState(true);
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  
  const navigate = useNavigate(); // ✅ Initialize Navigation

  useEffect(() => {
    // ✅ Update tab when prop changes
    setActiveTab(defaultTab);
  }, [defaultTab]);

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) setUser(userInfo);
    setTimeout(() => setLoading(false), 800);
  }, []);

  // ✅ Updated Back Logic
  const handleBack = () => {
      // If on separate Complaints page, go back to Main Senior Dashboard
      if (window.location.pathname.includes("/senior/complaints")) {
          navigate("/senior");
      } else {
          setActiveTab("menu");
          setSelectedCaseId(null);
      }
  };

  const handleFileRecordRequest = (id) => {
    setSelectedCaseId(id);
    setActiveTab("fir");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col font-sans">
      <Navbar />
      <Toaster position="top-right" />
      
      <div className="flex-1 px-4 md:px-12 py-24">
        
        {activeTab !== "menu" && (
            <button onClick={handleBack} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <span>←</span> Back to HQ Menu
            </button>
        )}

        <div className="max-w-7xl mx-auto">
            {loading ? <SkeletonLoader count={1} type="card" /> : (
                <>
                    {activeTab === "menu" && <SeniorMenu user={user} setActiveTab={setActiveTab} />}
                    {activeTab === "complaints" && <div className="animate-fade-in-up"><SeniorViewComplaints onFileRecord={handleFileRecordRequest} /></div>}
                    {activeTab === "manage_officers" && <div className="animate-fade-in-up"><SeniorManageOfficers /></div>}
                    
                    {/* Senior Chat */}
                    {activeTab === "connect" && <div className="animate-fade-in-up"><PoliceConnect currentUser={user} /></div>}

                    {activeTab === "fir" && <div className="animate-fade-in-up"><FileFIR onCancel={handleBack} prefillId={selectedCaseId} /></div>}
                    {activeTab === "history" && <PastCrimes />}
                    {activeTab === "cctv" && <SuspiciousActivity />}
                    {activeTab === "face" && <FaceDetection />}
                    
                    {activeTab === "track" && (
                          <div className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700">
                             <h2 className="text-2xl font-bold mb-2">📡 Live GPS Tracking</h2>
                             <p className="text-gray-400">Map integration module (Google Maps API) loading...</p>
                          </div>
                    )}
                </>
            )}
        </div>
      </div>
    </div>
  );
};

export default SeniorDashboard;