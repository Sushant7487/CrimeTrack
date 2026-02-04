

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const StatusTracker = ({ complaints }) => {
  const [searchId, setSearchId] = useState(""); // ✅ Search State
  const [selectedId, setSelectedId] = useState(null);

  // Timeline Logic Same...
  const getTimeline = (status) => [ /* ... same ... */ ];

  // ✅ Filter Logic
  const filteredComplaints = complaints.filter(c => 
    c._id.toLowerCase().includes(searchId.toLowerCase())
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Track Complaints</h2>
      
      {/* ✅ NEW: Search Box */}
      <div className="mb-6 flex gap-2">
        <input 
            type="text" 
            placeholder="Enter Complaint ID to Track..." 
            className="flex-1 bg-gray-800 border border-gray-600 rounded-xl px-4 py-3 text-white focus:border-blue-500 outline-none"
            onChange={(e) => setSearchId(e.target.value)}
        />
      </div>

      {filteredComplaints.length === 0 && (
        <div className="text-center py-10 bg-gray-800/50 rounded-xl border border-gray-700">
            <p className="text-gray-400">No complaints found with ID: {searchId}</p>
        </div>
      )}

      <div className="space-y-6">
        {filteredComplaints.map((c) => {
            // ... Card Code Same As Before ...
            // Bas ye ensure karna ki card render ho raha hai
            return (
                <div key={c._id} className="bg-gray-800/60 p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-colors shadow-lg">
                    {/* ... (Copy card content from previous StatusTracker code) ... */}
                    {/* Just Ensure you use c._id everywhere */}
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                            <span className="text-blue-400 font-mono font-bold text-lg">#{c._id.slice(-6)}</span>
                            {/* ... status badge ... */}
                            <h3 className="text-xl font-semibold mt-1 text-white">{c.crimeType}</h3>
                        </div>
                        <button onClick={() => setSelectedId(selectedId === c._id ? null : c._id)} className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/50 rounded-lg text-sm">
                            {selectedId === c._id ? "Hide Details" : "Track Status"}
                        </button>
                    </div>
                    
                    {/* Timeline Expansion */}
                    <AnimatePresence>
                        {selectedId === c._id && (
                            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="mt-6 pt-6 border-t border-gray-700 overflow-hidden">
                                <div className="relative pl-4 border-l-2 border-gray-700 space-y-6">
                                    {getTimeline(c.status).map((step, i) => (
                                        <div key={i} className="relative pl-6">
                                            <div className={`absolute -left-[25px] top-1 w-4 h-4 rounded-full border-2 ${step.done ? "bg-green-500 border-green-500" : "bg-gray-900 border-gray-600"}`}></div>
                                            <h5 className={`font-semibold ${step.done ? "text-green-400" : "text-gray-500"}`}>{step.title}</h5>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )
        })}
      </div>
    </motion.div>
  );
};

export default StatusTracker;