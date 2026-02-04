
import React from 'react';
import { FaTimes, FaDownload, FaExternalLinkAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const MediaPreviewModal = ({ fileUrl, fileType, onClose }) => {
    if (!fileUrl) return null;

    const handleDownload = async () => {
        try {
            // 1. Fetch the file as a blob
            const response = await fetch(fileUrl);
            const blob = await response.blob();
            
            // 2. Create a temporary URL
            const url = window.URL.createObjectURL(blob);
            
            // 3. Extract correct extension from original URL (e.g., 'document.pdf' -> 'pdf')
            // Fallback to 'file' if extension not found
            const extension = fileUrl.split('.').pop().split(/\#|\?/)[0] || 'file';
            
            // 4. Trigger Download
            const a = document.createElement('a');
            a.href = url;
            a.download = `crimetrack-download-${Date.now()}.${extension}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url); // Clean up
        } catch (error) {
            console.error("Download failed:", error);
            // Fallback: Open in new tab if blob fails
            window.open(fileUrl, '_blank');
        }
    };

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
            >
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-5 right-5 text-gray-400 hover:text-white text-3xl z-50 transition-colors bg-black/50 rounded-full p-2">
                    <FaTimes />
                </button>

                {/* Content Container */}
                <div className="w-full max-w-5xl h-[85vh] relative flex flex-col items-center justify-center">
                    
                    {/* IMAGE */}
                    {fileType === 'image' && (
                        <img src={fileUrl} alt="Preview" className="max-w-full max-h-full object-contain rounded-md shadow-2xl" />
                    )}
                    
                    {/* VIDEO */}
                    {fileType === 'video' && (
                        <video src={fileUrl} controls autoPlay className="max-w-full max-h-full rounded-md shadow-2xl" />
                    )}
                    
                    {/* PDF (Updated Logic) */}
                    {fileType === 'pdf' && (
                        <div className="w-full h-full bg-white rounded-lg overflow-hidden relative">
                            <embed 
                                src={fileUrl} 
                                type="application/pdf" 
                                className="w-full h-full" 
                            />
                            {/* Fallback overlay if browser blocks embed */}
                            <div className="absolute bottom-4 right-4">
                                <a 
                                    href={fileUrl} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-full text-sm hover:bg-slate-700"
                                >
                                    <FaExternalLinkAlt /> Open in New Tab
                                </a>
                            </div>
                        </div>
                    )}

                    {/* AUDIO (Visualizer Placeholder) */}
                    {fileType === 'audio' && (
                        <div className="bg-slate-800 p-10 rounded-2xl flex flex-col items-center gap-6 shadow-2xl border border-slate-700">
                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                                <span className="text-4xl">🎵</span>
                            </div>
                            <audio src={fileUrl} controls className="w-80" />
                        </div>
                    )}

                    {/* Download Button */}
                    <button 
                        onClick={handleDownload}
                        className="mt-6 px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold shadow-lg flex items-center gap-3 transition-all hover:scale-105"
                    >
                        <FaDownload /> Download File
                    </button>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MediaPreviewModal;