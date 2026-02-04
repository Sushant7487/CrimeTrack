
import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import axios from "axios"; 
import { BASE_URL } from "../config"; 

// Background Image (Abstract & Clean - Less Noise)
const CHAT_BG = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop";

const LegalAid = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Namaste! 🙏 I am your CrimeTrack Legal Assistant. <br>I can guide you on <b>IPC Sections</b>, <b>FIR Procedures</b>, and <b>Safety Laws</b>.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    try {
      const { data } = await axios.post(`${BASE_URL}/api/legal-aid/ask`, {
        message: userMsg.text
      });
      const botMsg = { id: Date.now() + 1, text: data.reply, sender: "bot" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Chat Error:", error);
      const errorMsg = { id: Date.now() + 1, text: "⚠️ Server Connection Failed. Please try again.", sender: "bot" };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    // MAIN CONTAINER: 100vh Full Screen, No Padding on outer edges
    <div className="flex flex-col h-screen w-full bg-black font-sans overflow-hidden">
      
      {/* 1. BACKGROUND LAYER (Fixed & Darker for readability) */}
      <div className="fixed inset-0 z-0">
        <div 
            className="absolute inset-0 bg-cover bg-center grayscale opacity-20"
            style={{ backgroundImage: `url(${CHAT_BG})` }}
        />
        {/* Solid Dark Gradient Overlay - Reduces "Blue" feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/95 to-black" />
      </div>

      {/* 2. NAVBAR (Fixed Top) */}
      <div className="relative z-50 shadow-lg">
        <Navbar />
      </div>

      {/* 3. CHAT INTERFACE (Full remaining height) */}
      <div className="relative z-10 flex-1 flex flex-col w-full h-full max-w-7xl mx-auto">
            
            {/* HEADER: Centered Title (Mobile & Desktop) */}
            <div className="p-4 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 flex items-center justify-center shrink-0 shadow-sm z-20">
                <div className="flex flex-col items-center">
                    <h1 className="text-xl md:text-2xl font-serif tracking-wide text-gray-100 flex items-center gap-2">
                        <span className="text-emerald-500">⚖️</span> Legal Aid AI
                    </h1>
                    <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-mono mt-1">
                        CrimeTrack Official Assistant
                    </p>
                </div>
            </div>

            {/* MESSAGES AREA (Full Width, Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                        <div
                            className={`relative max-w-[85%] md:max-w-[70%] px-5 py-4 rounded-2xl text-sm md:text-base leading-7 shadow-xl border ${
                                msg.sender === "user"
                                    ? "bg-gray-800 border-gray-700 text-gray-100 rounded-br-sm" // User: Dark Grey (No Blue)
                                    : "bg-black/40 border-gray-800 text-gray-200 backdrop-blur-sm rounded-bl-sm" // Bot: Transparent/Glass
                            }`}
                        >
                            {/* Font styling for message text */}
                            <div 
                                className={msg.sender === "bot" ? "font-sans font-light" : "font-sans font-normal"}
                                dangerouslySetInnerHTML={{ 
                                __html: msg.text
                                    .replace(/\n/g, '<br />')
                                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-400 font-bold">$1</strong>') // Highlights in Emerald Green
                                    .replace(/## (.*?)\n/g, '<h3 class="text-lg font-serif text-white mt-3 mb-1 border-b border-gray-700 pb-1">$1</h3>') 
                            }} />
                            
                            {/* Tiny Timestamp/Sender Label */}
                            <div className={`text-[10px] mt-2 opacity-50 font-mono uppercase ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                {msg.sender === "user" ? "You" : "AI Assistant"}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start w-full">
                        <div className="bg-black/40 border border-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-75" />
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-150" />
                        </div>
                    </motion.div>
                )}
                <div ref={chatEndRef} />
            </div>

            {/* INPUT FOOTER (Full Width, Fixed Bottom) */}
            <div className="p-4 bg-black/80 backdrop-blur-xl border-t border-gray-800 shrink-0">
                <div className="max-w-4xl mx-auto flex gap-3 items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Type your legal question..."
                        className="flex-1 bg-gray-900/80 text-white border border-gray-700 rounded-xl px-5 py-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans placeholder-gray-500 shadow-inner"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim()}
                        className="px-6 py-4 bg-emerald-700 hover:bg-emerald-600 rounded-xl font-bold text-white transition-all transform active:scale-95 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        ➤
                    </button>
                </div>
            </div>

      </div>
    </div>
  );
};

export default LegalAid;