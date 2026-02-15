import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { FaArrowLeft, FaTrash, FaPlus, FaGavel } from "react-icons/fa";
import { BASE_URL } from "../../config";

const ManageSections = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ sectionName: "", category: "IPC", description: "" });

  const fetchData = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
      const { data } = await axios.get(`${BASE_URL}/api/metadata/sections`, config);
      setData(data);
    } catch (err) { toast.error("Failed to load sections"); }
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if(!form.sectionName) return toast.error("Section Name is required");
    setLoading(true);
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
        await axios.post(`${BASE_URL}/api/metadata/sections`, form, { headers: { Authorization: `Bearer ${userInfo.token}` } });
        toast.success("Section Added!");
        setForm({ sectionName: "", category: "IPC", description: "" });
        fetchData();
    } catch (err) { toast.error("Failed to add"); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!window.confirm("Delete this section?")) return;
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    try {
        await axios.delete(`${BASE_URL}/api/metadata/sections/${id}`, { headers: { Authorization: `Bearer ${userInfo.token}` } });
        toast.success("Deleted");
        fetchData();
    } catch (err) { toast.error("Delete Failed"); }
  };

  return (
    // ✅ FIX 1: 'pt-24' added to push content below Navbar
    <div className="min-h-screen bg-gray-900 text-white font-sans pt-24">
      <Navbar />
      <Toaster />
      
      {/* Header - Solid Background to prevent overlap transparency */}
      <div className="sticky top-[80px] z-30 bg-gray-900 border-b border-white/10 shadow-lg py-3 px-4 md:px-8">
          <div className="max-w-4xl mx-auto flex items-center gap-3">
            <button onClick={() => navigate("/admin/data")} className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-all">
                <FaArrowLeft className="text-sm" />
            </button>
            <h1 className="text-xl font-bold flex items-center gap-2"><FaGavel className="text-amber-500"/> Legal Sections</h1>
          </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Form - More Compact (Reduced Padding & Text Size) */}
        <form onSubmit={handleAdd} className="bg-slate-800/40 p-4 md:p-5 rounded-xl border border-white/5 mb-6 shadow-md">
            <div className="flex flex-col md:flex-row gap-3 mb-3">
                <div className="flex-[2]">
                    <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase">Section Name</label>
                    <input 
                        value={form.sectionName} 
                        onChange={(e) => setForm({...form, sectionName: e.target.value})} 
                        placeholder="e.g. IPC 302" 
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-amber-500 transition-all" 
                    />
                </div>
                <div className="flex-1">
                    <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase">Category</label>
                    {/* ✅ FIX 2: Styled Dropdown Options */}
                    <select 
                        value={form.category} 
                        onChange={(e) => setForm({...form, category: e.target.value})} 
                        className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-amber-500 transition-all cursor-pointer"
                    >
                        <option value="IPC" className="bg-gray-800 text-white py-2">IPC</option>
                        <option value="NCR" className="bg-gray-800 text-white py-2">NCR / Other</option>
                    </select>
                </div>
            </div>
            <div className="mb-3">
                <label className="text-[10px] text-gray-400 font-bold ml-1 uppercase">Description (Optional)</label>
                <input 
                    value={form.description} 
                    onChange={(e) => setForm({...form, description: e.target.value})} 
                    placeholder="Short description..." 
                    className="w-full bg-black/30 border border-white/10 rounded-lg p-2.5 text-sm text-white outline-none focus:border-amber-500 transition-all" 
                />
            </div>
            <button disabled={loading} className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all text-sm">
                <FaPlus /> Add Section
            </button>
        </form>

        {/* List - Compact Items */}
        <div className="space-y-2">
            {data.map((item) => (
                <div key={item._id} className="flex items-center justify-between p-3 bg-slate-800/40 border border-white/5 rounded-lg hover:border-amber-500/30 transition-all group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border shrink-0 ${item.category === 'IPC' ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' : 'bg-blue-500/10 border-blue-500/30 text-blue-400'}`}>
                            {item.category}
                        </span>
                        <div className="min-w-0">
                            <h3 className="font-bold text-sm text-white truncate group-hover:text-amber-200">{item.sectionName}</h3>
                            {item.description && <p className="text-[10px] text-gray-400 truncate">{item.description}</p>}
                        </div>
                    </div>
                    <button onClick={() => handleDelete(item._id)} className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all shrink-0">
                        <FaTrash className="text-sm" />
                    </button>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ManageSections;