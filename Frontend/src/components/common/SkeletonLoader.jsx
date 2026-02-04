import React from "react";
const SkeletonLoader = ({ type = "text", count = 1 }) => (
  <div className="space-y-3 w-full animate-pulse">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`bg-gray-700/50 rounded-lg ${type === "card" ? "h-32" : "h-12"}`}></div>
    ))}
  </div>
);
export default SkeletonLoader;