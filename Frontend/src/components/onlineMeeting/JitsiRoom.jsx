import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import SkeletonLoader from '../common/SkeletonLoader';

const JitsiRoom = () => {
  const { roomName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isAdmin, username } = location.state || { isAdmin: false, username: 'Guest' };

  return (
    <div className="h-screen w-full bg-black flex flex-col">
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 z-50 bg-red-600 text-white px-4 py-1 rounded">Leave Meeting</button>
        
        <JitsiMeeting
            domain = "meet.jit.si"
            roomName = {roomName}
            configOverwrite = {{
                startWithAudioMuted: true,
                disableThirdPartyRequests: true,
                prejoinPageEnabled: false,
                // ✅ WAITING ROOM LOGIC
                // If I am admin (Host), I enable the lobby. 
                // Guests will automatically be put in lobby by Jitsi if enabled.
                enableLobby: isAdmin 
            }}
            interfaceConfigOverwrite = {{
                DISABLE_JOIN_LEAVE_NOTIFICATIONS: true
            }}
            userInfo = {{
                displayName: username
            }}
            onApiReady = { (externalApi) => {
                // You can attach event listeners here
                if(isAdmin) {
                    // Force Enable Lobby Mode immediately when Admin joins
                    externalApi.executeCommand('toggleLobby', true); 
                }
            }}
            getIFrameRef = { (iframeRef) => { iframeRef.style.height = '100vh'; } }
        />
    </div>
  );
};

export default JitsiRoom;