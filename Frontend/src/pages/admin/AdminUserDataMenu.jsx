import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { FaUser, FaUserShield, FaUserTie, FaArrowLeft } from "react-icons/fa";

const AdminUserDataMenu = () => {
  const navigate = useNavigate();

  const cards = [
    { role: "citizen", label: "Citizens", icon: <FaUser />, color: "blue" },
    { role: "police", label: "Police Officials", icon: <FaUserShield />, color: "purple" },
    { role: "senior", label: "Senior Officials", icon: <FaUserTie />, color: "amber" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-28 px-4">
        <button onClick={() => navigate("/admin/data")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
            <FaArrowLeft /> Back
        </button>
        
        <h1 className="text-3xl font-bold mb-8">User Data Management</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map((c) => (
            <div 
              key={c.role} 
              onClick={() => navigate(`/admin/data/users/${c.role}`)}
              className={`bg-slate-800 border border-slate-700 p-10 rounded-3xl cursor-pointer hover:border-${c.color}-500 hover:shadow-[0_0_30px_rgba(0,0,0,0.3)] transition-all group text-center`}
            >
              <div className={`text-6xl text-${c.color}-500 mb-6 group-hover:scale-110 transition-transform inline-block`}>
                {c.icon}
              </div>
              <h2 className="text-2xl font-bold text-white group-hover:text-gray-200">{c.label}</h2>
              <p className="text-slate-400 mt-2">Manage {c.label} Data</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUserDataMenu;