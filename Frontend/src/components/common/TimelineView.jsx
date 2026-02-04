import React from "react";
import { FaClock, FaCheckCircle } from "react-icons/fa";

const TimelineView = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-6 text-slate-500 text-xs italic border border-dashed border-slate-700 rounded-lg bg-slate-900/30">
        No activity recorded in the log yet.
      </div>
    );
  }

  // Sort history by date (newest first)
  const sortedHistory = [...history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="relative pl-6 border-l-2 border-slate-700 ml-3 space-y-8">
      {sortedHistory.map((log, index) => {
        const isLatest = index === 0;
        return (
          <div key={index} className="relative group">
            {/* Timeline Dot */}
            <div
              className={`absolute -left-[31px] top-1 w-6 h-6 rounded-full border-4 flex items-center justify-center transition-all ${
                isLatest ? "border-blue-500 bg-slate-900 shadow-[0_0_10px_#3b82f6]" : "border-slate-800 bg-slate-900"
              }`}
            >
              <div className={`w-2 h-2 rounded-full ${isLatest ? "bg-blue-400 animate-pulse" : "bg-slate-600"}`}></div>
            </div>

            {/* Content Card */}
            <div className={`ml-2 p-4 rounded-lg border transition-all ${isLatest ? 'bg-slate-800/80 border-blue-500/30 shadow-lg' : 'bg-transparent border-transparent hover:bg-slate-800/30 hover:border-slate-700'}`}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                <h4 className={`text-sm font-bold uppercase tracking-wider ${isLatest ? 'text-blue-300' : 'text-slate-400'}`}>
                  {log.status}
                </h4>
                <span className="text-[10px] text-slate-500 flex items-center gap-1 font-mono bg-slate-900/50 px-2 py-0.5 rounded">
                  <FaClock size={10} />
                  {new Date(log.timestamp).toLocaleString([], {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              
              {log.remark && (
                <p className={`text-xs mt-2 leading-relaxed font-medium ${isLatest ? 'text-slate-200' : 'text-slate-500'}`}>
                  {log.remark}
                </p>
              )}
              
              <div className="mt-3 flex items-center gap-2">
                 <span className="text-[9px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded bg-slate-900/50">
                    Action By: <span className="text-slate-300">{log.updatedBy || "System"}</span>
                 </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimelineView;