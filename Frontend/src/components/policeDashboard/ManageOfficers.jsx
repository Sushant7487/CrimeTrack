
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import SkeletonLoader from "../common/SkeletonLoader";

const ManageOfficers = () => {
  const [officers, setOfficers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    firstName: "", lastName: "", email: "", password: "", mobile: "", gender: "Male", station: "Ramnagar", designation: "Inspector", secretCode: "POLICE123"
  });

  const fetchOfficers = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get("https://crimetrack-api.onrender.com/api/users/officers", config);
      setOfficers(data);
      setLoading(false);
    } catch (error) { toast.error("Failed to fetch officers"); setLoading(false); }
  };

  useEffect(() => { fetchOfficers(); }, []);

  const handleAddOfficer = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://crimetrack-api.onrender.com/api/users/signup", { ...formData, role: 'police' });
      toast.success("Officer Added!");
      setShowForm(false);
      fetchOfficers();
    } catch (error) { toast.error("Failed to add officer"); }
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Remove Officer?")) return;
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.delete(`https://crimetrack-api.onrender.com/api/users/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
      toast.success("Officer Removed");
      fetchOfficers();
    } catch (error) { toast.error("Delete Failed"); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center bg-indigo-900/30 p-6 rounded-xl border border-indigo-500/30">
            <h2 className="text-2xl font-bold text-white">Manage Force</h2>
            <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-indigo-600 rounded-lg font-bold">
                {showForm ? "Cancel" : "+ Add Officer"}
            </button>
        </div>

        {showForm && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <form onSubmit={handleAddOfficer} className="grid grid-cols-2 gap-4">
                    <input name="firstName" placeholder="First Name" onChange={handleChange} className="p-2 bg-gray-900 rounded border border-gray-600 text-white" required />
                    <input name="lastName" placeholder="Last Name" onChange={handleChange} className="p-2 bg-gray-900 rounded border border-gray-600 text-white" required />
                    <input name="email" placeholder="Email" onChange={handleChange} className="p-2 bg-gray-900 rounded border border-gray-600 text-white" required />
                    <input name="password" type="password" placeholder="Password" onChange={handleChange} className="p-2 bg-gray-900 rounded border border-gray-600 text-white" required />
                    <input name="mobile" placeholder="Mobile" onChange={handleChange} className="p-2 bg-gray-900 rounded border border-gray-600 text-white" required />
                    <select name="designation" onChange={handleChange} className="p-2 bg-gray-900 rounded border border-gray-600 text-white">
                        <option>Constable</option><option>Inspector</option><option>SI</option><option>ACP</option>
                    </select>
                    <button type="submit" className="col-span-2 py-2 bg-green-600 rounded font-bold text-white">Create Account</button>
                </form>
            </motion.div>
        )}

        {loading ? <SkeletonLoader type="card" count={3} /> : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {officers.map(off => (
                    <div key={off._id} className="bg-gray-800 p-4 rounded-xl border border-gray-700 flex flex-col gap-2">
                        <div className="flex justify-between">
                            <h3 className="font-bold text-white">{off.firstName} {off.lastName}</h3>
                            <button onClick={() => handleDelete(off._id)} className="text-red-500">🗑</button>
                        </div>
                        <p className="text-sm text-indigo-300">{off.designation}</p>
                        <p className="text-xs text-gray-400">{off.email} | {off.mobile}</p>
                    </div>
                ))}
            </div>
        )}
    </div>
  );
};
export default ManageOfficers;