import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { FaArrowLeft, FaTrash, FaPlus, FaIdBadge } from "react-icons/fa";
import { BASE_URL } from "../../config";

const ManageDesignations = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [roleType, setRoleType] = useState("police");

  const fetchData = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`${BASE_URL}/api/metadata/designations`, config);
      setData(data);
    } catch (err) { toast.error("Failed to load designations"); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!newTitle.trim()) return toast.error("Enter a title");
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
        await axios.post(`${BASE_URL}/api/metadata/designations`, { title: newTitle, roleType }, { headers: { Authorization: `Bearer ${userInfo.token}` } });
        toast.success("Designation Added!");
        setNewTitle("");
        fetchData();
    } catch (err) { toast.error("Failed to add"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this designation?")) return;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
        await axios.delete(`${BASE_URL}/api/metadata/designations/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
        toast.success("Deleted");
        fetchData();
    } catch (err) { toast.error("Delete Failed"); }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans pt-24">
      <Navbar />
      <Toaster />
      
      <div className="sticky top-[80px] z-30 bg-gray-900 border-b border-white/10 shadow-lg py-3 px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <button onClick={() => navigate("/admin/data")} className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all"><FaArrowLeft className="text-sm"/></button>
            <h1 className="text-xl font-bold flex items-center gap-2"><FaIdBadge className="text-pink-500"/> Manage Designations</h1>
          </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        
        <form onSubmit={handleAdd} className="bg-slate-800/40 p-4 rounded-xl border border-white/5 mb-6 flex flex-col md:flex-row gap-3 items-end shadow-md">
            <div className="flex-1 w-full">
                <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase">New Designation Title</label>
                <input 
                    value={newTitle} 
                    onChange={(e) => setNewTitle(e.target.value)} 
                    placeholder="e.g. Senior Inspector" 
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-pink-500 transition-all" 
                />
            </div>
            <div className="w-full md:w-48">
                <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase">Role Category</label>
                <select 
                    value={roleType} 
                    onChange={(e) => setRoleType(e.target.value)} 
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-pink-500 transition-all cursor-pointer"
                >
                    <option value="police" className="bg-gray-800">Regular Police</option>
                    <option value="senior" className="bg-gray-800">Senior Official</option>
                </select>
            </div>
            <button disabled={loading} className="w-full md:w-auto bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2.5 px-6 rounded-lg flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all text-sm">
                <FaPlus /> Add
            </button>
        </form>

        <div className="space-y-2">
            {data.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-slate-800/40 border border-white/5 rounded-lg hover:border-pink-500/30 transition-all group">
                    <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${item.roleType === 'senior' ? 'bg-amber-500/20 text-amber-400' : 'bg-pink-500/20 text-pink-400'}`}>
                            {item.title[0]}
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">{item.title}</h3>
                            <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded border ${item.roleType === 'senior' ? 'border-amber-500/30 text-amber-400' : 'border-pink-500/30 text-pink-400'}`}>
                                {item.roleType}
                            </span>
                        </div>
                    </div>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all">
                        <FaTrash className="text-sm" />
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageDesignations;