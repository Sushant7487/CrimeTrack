import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import SkeletonLoader from "../common/SkeletonLoader";

const ContactOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchOfficers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      
      // ✅ Hits your existing Backend API
      const { data } = await axios.get("https://crimetrack-api.onrender.com/api/users/officers", config);
      setOfficers(data);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to load directory");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  // Filter Logic
  const filteredOfficers = officers.filter(off => 
    off.station?.toLowerCase().includes(search.toLowerCase()) || 
    off.firstName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header & Search */}
      <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg">
        <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span>📞</span> Police Directory
            </h2>
            <p className="text-gray-400 text-sm">Find contact details of officers in your area.</p>
        </div>
        <input 
            type="text" 
            placeholder="Search by Station or Name..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-80 bg-gray-900 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
        />
      </div>

      {/* Grid */}
      {loading ? <SkeletonLoader count={6} type="card" /> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOfficers.length > 0 ? filteredOfficers.map((officer) => (
                <div key={officer._id} className="bg-gray-800/50 border border-gray-700 p-6 rounded-2xl hover:border-green-500 transition-all group shadow-lg">
                    <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform">
                            👮‍♂️
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase border ${officer.role === 'senior' ? 'bg-amber-900/30 text-amber-400 border-amber-500/30' : 'bg-blue-900/30 text-blue-400 border-blue-500/30'}`}>
                            {officer.designation}
                        </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1">
                        {officer.firstName} {officer.lastName}
                    </h3>
                    
                    <div className="space-y-3 mt-4">
                        <div className="flex items-center gap-3 text-gray-300 bg-gray-900/50 p-2 rounded-lg">
                            <span className="text-gray-500 text-lg">📍</span>
                            <span className="text-sm font-medium">{officer.station || "Headquarters"}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300 bg-gray-900/50 p-2 rounded-lg">
                            <span className="text-gray-500 text-lg">📱</span>
                            <span className="text-sm font-mono">{officer.mobile}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-300 bg-gray-900/50 p-2 rounded-lg">
                            <span className="text-gray-500 text-lg">📧</span>
                            <span className="text-sm truncate">{officer.email}</span>
                        </div>
                    </div>

                    <a href={`tel:${officer.mobile}`} className="block mt-6 text-center bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-xl transition-colors">
                        Call Now
                    </a>
                </div>
            )) : (
                <div className="col-span-3 text-center py-10 text-gray-500">
                    No officers found matching your search.
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default ContactOfficers;