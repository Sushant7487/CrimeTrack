import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/90 text-gray-400 py-10 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Crime<span className="text-blue-500">Track</span></h2>
          <p className="text-sm leading-relaxed">
            A digital initiative to bridge the gap between citizens and law enforcement. 
            Ensuring safety through technology and transparency.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-white font-semibold mb-2">Quick Access</h3>
          <Link to="/" className="hover:text-blue-400 transition">Home</Link>
          <Link to="/signup" className="hover:text-blue-400 transition">Report Crime</Link>
          <Link to="/login" className="hover:text-blue-400 transition">Officer Login</Link>
          <Link to="/legalaid" className="hover:text-blue-400 transition">Legal Aid</Link>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-2">Emergency Contact</h3>
          <p>Police Control Room: <span className="text-red-500 font-bold">100</span></p>
          <p>Women Helpline: <span className="text-pink-500 font-bold">1091</span></p>
          <p>Cyber Crime: <span className="text-blue-500 font-bold">1930</span></p>
          <p className="mt-4 text-sm">Email: support@crimetrack.gov.in</p>
        </div>

      </div>
      
      <div className="text-center mt-10 pt-6 border-t border-gray-800 text-sm">
        <p>© 2025 CrimeTrack India. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;