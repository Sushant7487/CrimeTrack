import React from "react";

const FaceDetection = () => (
  <div className="text-center py-10">
      <h2 className="text-3xl font-bold mb-4">Criminal Face Match</h2>
      <div className="border-2 border-dashed border-gray-600 rounded-2xl p-12 max-w-xl mx-auto hover:border-purple-500 transition-colors cursor-pointer bg-gray-800/30 group">
          <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">📷</div>
          <p className="text-xl group-hover:text-purple-400">Upload Suspect Photo</p>
      </div>
      <button className="mt-6 px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-xl font-bold shadow-lg">Scan Database</button>
  </div>
);
export default FaceDetection;