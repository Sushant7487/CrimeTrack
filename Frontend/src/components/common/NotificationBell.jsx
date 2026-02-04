import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { BASE_URL } from '../../config';
import { toast } from 'react-hot-toast';

const NotificationBell = ({ userId }) => {
    const [hasNotification, setHasNotification] = useState(false);

    useEffect(() => {
        if (!userId) return;
        const socket = io(BASE_URL);
        socket.emit("register_officer", userId);

        socket.on("new_notification", (data) => {
            setHasNotification(true);
            toast.custom((t) => (
                <div onClick={() => toast.dismiss(t.id)} className="bg-gray-800 border-l-4 border-emerald-500 p-4 rounded shadow-2xl cursor-pointer flex items-center gap-3 w-80 animate-bounce">
                    <div className="bg-emerald-600 p-2 rounded-full text-white text-xl">🔔</div>
                    <div>
                        <p className="font-bold text-white text-sm">New Msg: {data.senderName}</p>
                        <p className="text-xs text-gray-400 truncate">{data.message}</p>
                    </div>
                </div>
            ), { duration: 4000, position: 'top-right' });
        });

        return () => socket.disconnect();
    }, [userId]);

    return (
        <div className="relative cursor-pointer" onClick={() => setHasNotification(false)}>
            {/* Custom Bell Image from Assets */}
            <img 
                src="/assets/bell-icon.png" 
                alt="Alerts" 
                className={`w-8 h-8 transition-transform hover:scale-110 ${hasNotification ? 'animate-swing' : ''}`} 
            />
            {hasNotification && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-ping"></span>
            )}
        </div>
    );
};

export default NotificationBell;