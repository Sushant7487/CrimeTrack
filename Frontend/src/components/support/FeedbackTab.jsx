// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaStar } from "react-icons/fa";

// const FeedbackTab = () => {
//   const [type, setType] = useState("Review");
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment) return toast.error("Please write something!");
//     if (type === "Review" && rating === 0) return toast.error("Please select a star rating!");

//     setLoading(true);
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post("http://localhost:5000/api/support/feedback", 
//         { type, rating: type === "Review" ? rating : undefined, comment },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       toast.success("Thank you for your feedback!");
//       setComment("");
//       setRating(0);
//     } catch (error) {
//       toast.error("Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto text-center py-8">
//       {/* Toggle Type */}
//       <div className="flex justify-center gap-6 mb-8">
//         {["Review", "Suggestion"].map((t) => (
//           <button
//             key={t}
//             onClick={() => setType(t)}
//             className={`px-6 py-2 rounded-full border transition-all ${
//               type === t ? "bg-purple-600 border-purple-600 text-white" : "bg-transparent border-slate-600 text-slate-400"
//             }`}
//           >
//             {t}
//           </button>
//         ))}
//       </div>

//       <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl border border-slate-700 shadow-lg">
//         {/* Star Rating (Only for Reviews) */}
//         {type === "Review" && (
//           <div className="flex justify-center gap-2 mb-6">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <FaStar
//                 key={star}
//                 className={`text-4xl cursor-pointer transition-transform hover:scale-110 ${
//                   star <= rating ? "text-yellow-400" : "text-slate-700"
//                 }`}
//                 onClick={() => setRating(star)}
//               />
//             ))}
//           </div>
//         )}

//         <h3 className="text-xl font-bold text-white mb-4">
//           {type === "Review" ? "How is your experience?" : "What features should we add?"}
//         </h3>

//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder={type === "Review" ? "Write your review here..." : "Suggest improvements..."}
//           className="w-full h-32 bg-slate-800 border border-slate-600 rounded-xl p-4 text-white focus:border-purple-500 outline-none resize-none mb-6"
//         ></textarea>

//         <button
//           disabled={loading}
//           className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-purple-900/50"
//         >
//           {loading ? "Sending..." : "Submit Feedback"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FeedbackTab;






// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaStar } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const FeedbackTab = () => {
//   const [type, setType] = useState("Review");
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment) return toast.error("Please write something!");
//     if (type === "Review" && rating === 0) return toast.error("Please select a star rating!");

//     setLoading(true);
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post(`${BASE_URL}/api/support/feedback`, 
//         { type, rating: type === "Review" ? rating : undefined, comment },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       toast.success("Thank you for your feedback!");
//       setComment("");
//       setRating(0);
//     } catch (error) {
//       toast.error("Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-4">
      
//       {/* Toggle Type Switcher */}
//       <div className="flex justify-center mb-8">
//         <div className="bg-slate-900 p-1 rounded-full border border-slate-700 flex">
//           {["Review", "Suggestion"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setType(t)}
//               className={`px-8 py-2 rounded-full font-medium transition-all ${
//                 type === t 
//                   ? "bg-purple-600 text-white shadow-lg" 
//                   : "text-slate-400 hover:text-white"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
        
//         {/* Background Gradient Blob */}
//         <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

//         {/* ✅ ANIMATED STAR RATING */}
//         {type === "Review" && (
//           <div className="text-center mb-8">
//             <p className="text-slate-400 text-sm mb-3 uppercase tracking-widest font-bold">Rate your experience</p>
//             <div className="flex justify-center gap-3">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <FaStar
//                   key={star}
//                   className={`text-5xl cursor-pointer transition-all duration-300 transform hover:scale-125 ${
//                     star <= rating 
//                       ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse" // ✅ GLOWING ANIMATION
//                       : "text-slate-700 hover:text-yellow-500/50"
//                   }`}
//                   onClick={() => setRating(star)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <h3 className="text-xl font-bold text-white mb-4 text-center">
//           {type === "Review" ? "Tell us what you think" : "How can we improve?"}
//         </h3>

//         {/* Text Area with nice styling */}
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder={type === "Review" ? "Write your detailed review here..." : "Suggest a new feature or improvement..."}
//           className="w-full h-36 bg-slate-800/50 border-2 border-slate-600 rounded-2xl p-5 text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none resize-none mb-6 transition-all placeholder-gray-500 shadow-inner"
//         ></textarea>

//         {/* Submit Button */}
//         <button
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/40 active:scale-95 text-lg"
//         >
//           {loading ? "Sending..." : `Submit ${type}`}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FeedbackTab;











// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { FaStar } from "react-icons/fa";
// import { BASE_URL } from "../../config";

// const FeedbackTab = () => {
//   const [type, setType] = useState("Review");
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!comment) return toast.error("Please write something!");
//     if (type === "Review" && rating === 0) return toast.error("Please select a star rating!");

//     setLoading(true);
//     try {
//       const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//       await axios.post(`${BASE_URL}/api/support/feedback`, 
//         { type, rating: type === "Review" ? rating : undefined, comment },
//         { headers: { Authorization: `Bearer ${userInfo.token}` } }
//       );
//       toast.success("Thank you for your feedback!");
//       setComment("");
//       setRating(0);
//     } catch (error) {
//       toast.error("Submission failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto py-2 md:py-4">
      
//       {/* Toggle Type Switcher - Compact on Mobile */}
//       <div className="flex justify-center mb-6 md:mb-8">
//         <div className="bg-slate-900 p-1 rounded-full border border-slate-700 flex">
//           {["Review", "Suggestion"].map((t) => (
//             <button
//               key={t}
//               onClick={() => setType(t)}
//               className={`px-6 py-1.5 text-sm md:px-8 md:py-2 md:text-base rounded-full font-medium transition-all ${
//                 type === t 
//                   ? "bg-purple-600 text-white shadow-lg" 
//                   : "text-slate-400 hover:text-white"
//               }`}
//             >
//               {t}
//             </button>
//           ))}
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-md p-5 md:p-8 rounded-3xl border border-slate-700 shadow-2xl relative overflow-hidden">
        
//         <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-16 -mt-16"></div>

//         {/* ✅ ANIMATED STAR RATING - Smaller on Mobile */}
//         {type === "Review" && (
//           <div className="text-center mb-6 md:mb-8">
//             <p className="text-slate-400 text-xs md:text-sm mb-2 md:mb-3 uppercase tracking-widest font-bold">Rate your experience</p>
//             <div className="flex justify-center gap-2 md:gap-3">
//               {[1, 2, 3, 4, 5].map((star) => (
//                 <FaStar
//                   key={star}
//                   className={`text-3xl md:text-5xl cursor-pointer transition-all duration-300 transform hover:scale-125 ${
//                     star <= rating 
//                       ? "text-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.6)] animate-pulse" 
//                       : "text-slate-700 hover:text-yellow-500/50"
//                   }`}
//                   onClick={() => setRating(star)}
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 text-center">
//           {type === "Review" ? "Tell us what you think" : "How can we improve?"}
//         </h3>

//         {/* Text Area - Less height on mobile */}
//         <textarea
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder={type === "Review" ? "Write your detailed review here..." : "Suggest a new feature or improvement..."}
//           className="w-full h-28 md:h-36 bg-slate-800/50 border-2 border-slate-600 rounded-2xl p-4 md:p-5 text-sm md:text-base text-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none resize-none mb-4 md:mb-6 transition-all placeholder-gray-500 shadow-inner"
//         ></textarea>

//         {/* Submit Button */}
//         <button
//           disabled={loading}
//           className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-3 md:py-4 rounded-xl transition-all shadow-lg shadow-purple-900/40 active:scale-95 text-base md:text-lg"
//         >
//           {loading ? "Sending..." : `Submit ${type}`}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FeedbackTab;



import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FaStar, FaCommentDots, FaLightbulb } from "react-icons/fa";
import { BASE_URL } from "../../config";

const FeedbackTab = () => {
  const [type, setType] = useState("Review");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment) return toast.error("Please write something!");
    if (type === "Review" && rating === 0) return toast.error("Please select a star rating!");

    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      await axios.post(`${BASE_URL}/api/support/feedback`, 
        { type, rating: type === "Review" ? rating : undefined, comment },
        { headers: { Authorization: `Bearer ${userInfo.token}` } }
      );
      toast.success("Thank you for your feedback!");
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 animate-enter">
      
      {/* --- TOGGLE SWITCHER --- */}
      <div className="flex justify-center mb-10">
        <div className="bg-black/30 p-1.5 rounded-full border border-white/10 flex shadow-inner backdrop-blur-md">
          {["Review", "Suggestion"].map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                type === t 
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {t === "Review" ? <FaStar className={type===t?"animate-spin-slow":""}/> : <FaLightbulb className={type===t?"animate-pulse":""}/>}
              {t}
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-slate-900/60 backdrop-blur-2xl p-8 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Glow Effect Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20 mix-blend-screen"></div>

        {/* --- STAR RATING --- */}
        {type === "Review" && (
          <div className="text-center mb-10 relative z-10">
            <p className="text-purple-200/70 text-xs uppercase tracking-[0.3em] font-bold mb-4">Rate Your Experience</p>
            <div className="flex justify-center gap-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`text-4xl md:text-5xl cursor-pointer transition-all duration-300 transform hover:scale-125 hover:rotate-12 ${
                    star <= rating 
                      ? "text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]" 
                      : "text-slate-700 hover:text-yellow-500/50"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <p className="h-6 mt-2 text-sm font-medium text-yellow-400/80 transition-all">
                {rating === 1 && "Need Improvement"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good!"}
                {rating === 5 && "Excellent!"}
            </p>
          </div>
        )}

        <h3 className="text-2xl font-bold text-white mb-6 text-center relative z-10 flex items-center justify-center gap-3">
          <span className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg shadow-purple-500/20">
            {type === "Review" ? <FaCommentDots className="text-white text-sm"/> : <FaLightbulb className="text-white text-sm"/>}
          </span>
          {type === "Review" ? "Tell us what you think" : "How can we improve?"}
        </h3>

        {/* Text Area */}
        <div className="group relative z-10 mb-8">
            <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={type === "Review" ? "Write your detailed review here..." : "Suggest a new feature or improvement..."}
            className="w-full h-40 bg-slate-800/50 border border-white/10 rounded-3xl p-6 text-white text-base leading-relaxed focus:border-purple-400 focus:bg-slate-800 outline-none resize-none transition-all shadow-inner backdrop-blur-sm placeholder:text-slate-500"
            ></textarea>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black py-5 rounded-2xl transition-all shadow-[0_10px_40px_-10px_rgba(147,51,234,0.5)] active:scale-[0.98] text-lg relative z-10 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : `SUBMIT ${type.toUpperCase()}`}
        </button>
      </form>
    </div>
  );
};

export default FeedbackTab;