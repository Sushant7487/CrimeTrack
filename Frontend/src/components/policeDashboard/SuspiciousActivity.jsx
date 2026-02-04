import React from "react";

const SuspiciousActivity = () => (
  <div className="space-y-6">
      <div className="flex justify-between items-center"><h2 className="text-3xl font-bold">Live CCTV Surveillance</h2><div className="flex items-center gap-2"><span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span><span className="text-red-400 font-mono">LIVE</span></div></div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative bg-black rounded-xl overflow-hidden border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)] aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800"><span className="text-6xl opacity-20">📹 CAM 01</span></div>
              <div className="absolute bottom-4 left-4 right-4 bg-red-600/90 text-white p-2 rounded flex justify-between items-center animate-pulse"><span className="font-bold">⚠ ALERT: WEAPON DETECTED</span></div>
          </div>
          <div className="relative bg-black rounded-xl overflow-hidden border border-gray-700 aspect-video">
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800"><span className="text-6xl opacity-20">📹 CAM 02</span></div>
              <div className="absolute bottom-4 right-4 text-green-500 text-sm font-mono">Status: Normal</div>
          </div>
      </div>
  </div>
);
export default SuspiciousActivity;