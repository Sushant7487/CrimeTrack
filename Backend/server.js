
// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // ==========================================
// // ✅ ROUTES
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes (Existing)
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// // Mapping both /chat and /messages to messageRoutes to fix frontend 404s
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. 🤖 NEW: AI Legal Aid Route (Gemini)
// // Note: We use '/api/legal-aid' to avoid conflict with '/api/chat'
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 


// // ==========================================
// // 🔌 SOCKET LOGIC (Unchanged)
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         // Send to Recipient
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         // Send Notification
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         // Update Message Status to 'Delivered'
//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT (For Police Dashboard) ---
//   socket.on('sos_alert', (data) => {
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
//             try {
//                 const lastSeenTime = new Date();
//                 await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
//                 io.emit('user_status_change', { 
//                     userId, 
//                     status: 'offline', 
//                     lastSeen: lastSeenTime 
//                 });
//                 console.log(`User ${userId} went Offline`);
//             } catch (e) {
//                 console.error("Error updating offline status:", e.message);
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));










// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // ==========================================
// // ✅ ROUTES
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes (Existing)
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// // Mapping both /chat and /messages to messageRoutes to fix frontend 404s
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. 🤖 NEW: AI Legal Aid Route (Gemini)
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 


// // ==========================================
// // 🔌 SOCKET LOGIC
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER (Global Presence) ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         // Send to Recipient
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         // Send Notification
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         // Update Message Status to 'Delivered'
//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT (For Police Dashboard) ---
//   socket.on('sos_alert', (data) => {
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT (Fix for Forever Online) ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         // If no more tabs open for this user, mark Offline
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
//             try {
//                 const lastSeenTime = new Date();
//                 await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                
//                 io.emit('user_status_change', { 
//                     userId, 
//                     status: 'offline', 
//                     lastSeen: lastSeenTime 
//                 });
//                 console.log(`User ${userId} went Offline`);
//             } catch (e) {
//                 console.error("Error updating offline status:", e.message);
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));











// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // ==========================================
// // ✅ ROUTES
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes (Existing)
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// // Mapping both /chat and /messages to messageRoutes to fix frontend 404s
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. 🤖 NEW: AI Legal Aid Route (Gemini)
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 

// // 4. 🗂️ METADATA ROUTE (New Addition for Dynamic Dropdowns)
// app.use('/api/metadata', require('./routes/metadataRoutes'));


// // ==========================================
// // 🔌 SOCKET LOGIC
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER (Global Presence) ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         // Send to Recipient
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         // Send Notification
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         // Update Message Status to 'Delivered'
//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT (For Police Dashboard) ---
//   socket.on('sos_alert', (data) => {
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT (Fix for Forever Online) ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         // If no more tabs open for this user, mark Offline
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
//             try {
//                 const lastSeenTime = new Date();
//                 await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                
//                 io.emit('user_status_change', { 
//                     userId, 
//                     status: 'offline', 
//                     lastSeen: lastSeenTime 
//                 });
//                 console.log(`User ${userId} went Offline`);
//             } catch (e) {
//                 console.error("Error updating offline status:", e.message);
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));













































// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // ==========================================
// // ✅ ROUTES
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes (Existing)
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// // Mapping both /chat and /messages to messageRoutes to fix frontend 404s
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. 🤖 NEW: AI Legal Aid Route (Gemini)
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 

// // 4. 🗂️ METADATA ROUTE (New Addition for Dynamic Dropdowns)
// app.use('/api/metadata', require('./routes/metadataRoutes'));


// // ==========================================
// // 🔌 SOCKET LOGIC
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER (Global Presence) ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     // ✅ FIX: Ignore Static Admin ID to prevent Database Crash
//     // The Admin ID is a string ("ADMIN_ID_STATIC"), not a MongoDB ObjectId.
//     // Querying the DB with it causes a CastError crash.
//     if (userId === "ADMIN_ID_STATIC") return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         // Send to Recipient
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         // Send Notification
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         // Update Message Status to 'Delivered'
//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT (For Police Dashboard) ---
//   socket.on('sos_alert', (data) => {
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT (Fix for Forever Online) ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         // If no more tabs open for this user, mark Offline
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
            
//             // ✅ Fix: Don't try to update DB for Static Admin
//             if (userId !== "ADMIN_ID_STATIC") {
//                 try {
//                     const lastSeenTime = new Date();
//                     await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                    
//                     io.emit('user_status_change', { 
//                         userId, 
//                         status: 'offline', 
//                         lastSeen: lastSeenTime 
//                     });
//                     console.log(`User ${userId} went Offline`);
//                 } catch (e) {
//                     console.error("Error updating offline status:", e.message);
//                 }
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));












// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // ==========================================
// // ✅ ROUTES
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes (Existing)
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// // Mapping both /chat and /messages to messageRoutes to fix frontend 404s
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. 🤖 NEW: AI Legal Aid Route (Gemini)
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 

// // 4. 🗂️ METADATA ROUTE (New Addition for Dynamic Dropdowns)
// app.use('/api/metadata', require('./routes/metadataRoutes'));

// // 5. 🛠️ LOGGING ROUTE (New System Logs)


// // 6. 🆘 SUPPORT & FEEDBACK ROUTE (New Help/Review Module)
// app.use('/api/support', require('./routes/supportRoutes'));


// // ==========================================
// // 🔌 SOCKET LOGIC
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER (Global Presence) ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     // ✅ FIX: Ignore Static Admin ID to prevent Database Crash
//     // The Admin ID is a string ("ADMIN_ID_STATIC"), not a MongoDB ObjectId.
//     // Querying the DB with it causes a CastError crash.
//     if (userId === "ADMIN_ID_STATIC") return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         // Send to Recipient
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         // Send Notification
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         // Update Message Status to 'Delivered'
//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT (For Police Dashboard) ---
//   socket.on('sos_alert', (data) => {
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT (Fix for Forever Online) ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         // If no more tabs open for this user, mark Offline
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
            
//             // ✅ Fix: Don't try to update DB for Static Admin
//             if (userId !== "ADMIN_ID_STATIC") {
//                 try {
//                     const lastSeenTime = new Date();
//                     await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                    
//                     io.emit('user_status_change', { 
//                         userId, 
//                         status: 'offline', 
//                         lastSeen: lastSeenTime 
//                     });
//                     console.log(`User ${userId} went Offline`);
//                 } catch (e) {
//                     console.error("Error updating offline status:", e.message);
//                 }
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

















// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // ==========================================
// // ✅ ROUTES
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes (Existing)
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// // Mapping both /chat and /messages to messageRoutes to fix frontend 404s
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. 🤖 NEW: AI Legal Aid Route (Gemini)
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 

// // 4. 🗂️ METADATA ROUTE (Dynamic Dropdowns)
// app.use('/api/metadata', require('./routes/metadataRoutes'));


// // 6. 🆘 SUPPORT & FEEDBACK ROUTE (Help/Review Module)
// app.use('/api/support', require('./routes/supportRoutes'));
// app.use('/api/notices', require('./routes/noticeRoutes'));
// // 7. 🏠 HOME PAGE CONTENT ROUTE (Marquee, FAQs, Rotating Reviews)
// app.use('/api/homepage', require('./routes/homePageRoutes'));


// // ==========================================
// // 🔌 SOCKET LOGIC
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER (Global Presence) ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     // ✅ FIX: Ignore Static Admin ID to prevent Database Crash
//     if (userId === "ADMIN_ID_STATIC") return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         // Send to Recipient
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         // Send Notification
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         // Update Message Status to 'Delivered'
//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT (For Police Dashboard) ---
//   socket.on('sos_alert', (data) => {
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT (Fix for Forever Online) ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         // If no more tabs open for this user, mark Offline
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
            
//             // ✅ Fix: Don't try to update DB for Static Admin
//             if (userId !== "ADMIN_ID_STATIC") {
//                 try {
//                     const lastSeenTime = new Date();
//                     await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                    
//                     io.emit('user_status_change', { 
//                         userId, 
//                         status: 'offline', 
//                         lastSeen: lastSeenTime 
//                     });
//                     console.log(`User ${userId} went Offline`);
//                 } catch (e) {
//                     console.error("Error updating offline status:", e.message);
//                 }
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// const io = new Server(server, {
//   cors: { origin: "*", methods: ["GET", "POST"] }
// });

// // ==========================================
// // ✅ ROUTES (v1.3 Merged)
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. AI & Specialized Services
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 
// app.use('/api/meetings', require('./routes/meetingRoutes')); // ✅ From v1.2

// // 4. Metadata & Support (From v1.3)
// app.use('/api/metadata', require('./routes/metadataRoutes'));
// app.use('/api/support', require('./routes/supportRoutes'));
// app.use('/api/notices', require('./routes/noticeRoutes'));

// // 5. Home Page Content Manager
// app.use('/api/homepage', require('./routes/homePageRoutes'));

// // ==========================================
// // 🔌 SOCKET LOGIC (v1.3 with Admin Protection)
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER (Global Presence) ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     // ✅ FIX: Ignore Static Admin ID to prevent Database Crash
//     if (userId === "ADMIN_ID_STATIC") return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT ---
//   socket.on('sos_alert', (data) => {
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
            
//             // ✅ Fix: Don't try to update DB for Static Admin
//             if (userId !== "ADMIN_ID_STATIC") {
//                 try {
//                     const lastSeenTime = new Date();
//                     await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                    
//                     io.emit('user_status_change', { 
//                         userId, 
//                         status: 'offline', 
//                         lastSeen: lastSeenTime 
//                     });
//                     console.log(`User ${userId} went Offline`);
//                 } catch (e) {
//                     console.error("Error updating offline status:", e.message);
//                 }
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
















// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const http = require('http');
// const { Server } = require('socket.io');

// // Models
// const User = require('./models/User');
// const DirectMessage = require('./models/DirectMessage');

// // Config
// dotenv.config();
// connectDB(); 

// const app = express();
// const server = http.createServer(app);

// // Middleware
// // ✅ FIX: Enhanced CORS for Socket.io and Client
// app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"], methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
// app.use(express.json());
// app.use('/uploads', express.static('uploads'));

// // Socket Setup
// // ✅ FIX: Enhanced Socket CORS
// const io = new Server(server, {
//   cors: { 
//     origin: ["http://localhost:5173", "http://localhost:3000"], 
//     methods: ["GET", "POST"],
//     credentials: true
//   }
// });

// // ✅ IMPORTANT: Make 'io' accessible to Routes/Controllers
// app.set('io', io);

// // ==========================================
// // ✅ ROUTES (v1.3 Merged)
// // ==========================================

// // 1. Core Routes
// app.use('/api/users', require('./routes/userRoutes')); 
// app.use('/api/crime', require('./routes/crimeRoutes'));

// // 2. Chat & Messaging Routes
// app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
// app.use('/api/chat', require('./routes/messageRoutes')); 
// app.use('/api/messages', require('./routes/messageRoutes')); 

// // 3. AI & Specialized Services
// app.use('/api/legal-aid', require('./routes/chatRoutes')); 
// app.use('/api/meetings', require('./routes/meetingRoutes')); // ✅ From v1.2

// // 4. Metadata & Support (From v1.3)
// app.use('/api/metadata', require('./routes/metadataRoutes'));
// app.use('/api/support', require('./routes/supportRoutes'));
// app.use('/api/notices', require('./routes/noticeRoutes'));

// // 5. Home Page Content Manager
// app.use('/api/homepage', require('./routes/homePageRoutes'));

// // ==========================================
// // 🔌 SOCKET LOGIC (v1.3 with Admin Protection)
// // ==========================================

// const userConnections = new Map(); // UserId -> Set<SocketId>

// io.on('connection', (socket) => {
//   console.log(`Socket Connected: ${socket.id}`);

//   // --- 1. REGISTER USER (Global Presence) ---
//   socket.on('register_officer', async (userId) => {
//     if (!userId) return;

//     // ✅ FIX: Ignore Static Admin ID to prevent Database Crash
//     if (userId === "ADMIN_ID_STATIC") return;

//     if (!userConnections.has(userId)) {
//         userConnections.set(userId, new Set());
//     }
//     userConnections.get(userId).add(socket.id);
    
//     socket.join(userId); 

//     // Only broadcast "Online" if this is their first connection tab
//     if (userConnections.get(userId).size === 1) {
//         try {
//             await User.findByIdAndUpdate(userId, { isOnline: true });
//             io.emit('user_status_change', { userId, status: 'online' });
//             console.log(`User ${userId} is Online`);
//         } catch (e) {
//             console.error("Error updating online status:", e.message);
//         }
//     }
//   });

//   // --- 2. SEND MESSAGE ---
//   socket.on('send_direct_msg', async (data) => {
//     const { recipientId, _id: messageId } = data;
    
//     const recipientSockets = userConnections.get(recipientId);
//     const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

//     if (isRecipientOnline) {
//         io.to(recipientId).emit('receive_direct_msg', data);
        
//         io.to(recipientId).emit('new_notification', {
//             type: 'message',
//             senderName: data.senderName || "Officer",
//             message: data.message
//         });

//         if (messageId) {
//             try {
//                 await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
//                 socket.emit('msg_status_update', { messageId, status: 'delivered' });
//             } catch (e) {
//                 console.error("Error updating msg status:", e.message);
//             }
//         }
//     }
//   });

//   // --- 3. SOS ALERT (Redundant if Controller Emits, but keeping for safety) ---
//   socket.on('sos_alert', (data) => {
//       console.log("⚡ SOS Alert received via Socket Event");
//       io.emit('new_crime_report', { ...data, isSOS: true });
//   });

//   // --- 4. TYPING STATUS ---
//   socket.on('typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_typing', { senderId });
//   });

//   socket.on('stop_typing', ({ senderId, recipientId }) => {
//       io.to(recipientId).emit('partner_stop_typing', { senderId });
//   });

//   // --- 5. MARK SEEN ---
//   socket.on('mark_seen', async (data) => {
//     const { senderId, recipientId, messageIds } = data; 

//     try {
//         if(messageIds && messageIds.length > 0) {
//             await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
//         } else {
//             await DirectMessage.updateMany(
//                 { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
//                 { status: 'seen', isRead: true }
//             );
//         }

//         io.to(recipientId).emit('msg_status_update_bulk', { 
//             readerId: senderId, 
//             status: 'seen'
//         });
//     } catch (e) {
//         console.error("Error marking seen:", e.message);
//     }
//   });

//   // --- 6. DISCONNECT ---
//   socket.on('disconnect', async () => {
//     for (const [userId, sockets] of userConnections.entries()) {
//       if (sockets.has(socket.id)) {
//         sockets.delete(socket.id);
        
//         if (sockets.size === 0) {
//             userConnections.delete(userId);
            
//             // ✅ Fix: Don't try to update DB for Static Admin
//             if (userId !== "ADMIN_ID_STATIC") {
//                 try {
//                     const lastSeenTime = new Date();
//                     await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                    
//                     io.emit('user_status_change', { 
//                         userId, 
//                         status: 'offline', 
//                         lastSeen: lastSeenTime 
//                     });
//                     console.log(`User ${userId} went Offline`);
//                 } catch (e) {
//                     console.error("Error updating offline status:", e.message);
//                 }
//             }
//         }
//         break;
//       }
//     }
//   });
// });

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));













const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

// Models
const User = require('./models/User');
const DirectMessage = require('./models/DirectMessage');

// Config
dotenv.config();
connectDB(); 

const app = express();
const server = http.createServer(app);

// Middleware
// ✅ FIX: Enhanced CORS for Socket.io and Client
app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"], methods: ["GET", "POST", "PUT", "DELETE"], credentials: true }));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Socket Setup
// ✅ FIX: Enhanced Socket CORS
const io = new Server(server, {
  cors: { 
    origin: ["http://localhost:5173", "http://localhost:3000"], 
    methods: ["GET", "POST"],
    credentials: true
  }
});

// ✅ IMPORTANT: Make 'io' accessible to Routes/Controllers
app.set('io', io);

// ==========================================
// ✅ ROUTES (v1.3 Merged)
// ==========================================

// 1. Core Routes
app.use('/api/users', require('./routes/userRoutes')); 
app.use('/api/crime', require('./routes/crimeRoutes'));

// 2. Chat & Messaging Routes
app.use('/api/direct-chat', require('./routes/directChatRoutes')); 
app.use('/api/chat', require('./routes/messageRoutes')); 
app.use('/api/messages', require('./routes/messageRoutes')); 

// 3. AI & Specialized Services
app.use('/api/legal-aid', require('./routes/chatRoutes')); 
app.use('/api/meetings', require('./routes/meetingRoutes')); // ✅ From v1.2

// 4. Metadata & Support (From v1.3)
app.use('/api/metadata', require('./routes/metadataRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));
app.use('/api/notices', require('./routes/noticeRoutes'));

// 5. Home Page Content Manager
app.use('/api/homepage', require('./routes/homePageRoutes'));

// ✅ NEW: Police Clearance Certificate (PCC) Module
app.use('/api/pcc', require('./routes/pccRoutes'));

// ==========================================
// 🔌 SOCKET LOGIC (v1.3 with Admin Protection)
// ==========================================

const userConnections = new Map(); // UserId -> Set<SocketId>

io.on('connection', (socket) => {
  console.log(`Socket Connected: ${socket.id}`);

  // --- 1. REGISTER USER (Global Presence) ---
  socket.on('register_officer', async (userId) => {
    if (!userId) return;

    // ✅ FIX: Ignore Static Admin ID to prevent Database Crash
    if (userId === "ADMIN_ID_STATIC") return;

    if (!userConnections.has(userId)) {
        userConnections.set(userId, new Set());
    }
    userConnections.get(userId).add(socket.id);
    
    socket.join(userId); 

    // Only broadcast "Online" if this is their first connection tab
    if (userConnections.get(userId).size === 1) {
        try {
            await User.findByIdAndUpdate(userId, { isOnline: true });
            io.emit('user_status_change', { userId, status: 'online' });
            console.log(`User ${userId} is Online`);
        } catch (e) {
            console.error("Error updating online status:", e.message);
        }
    }
  });

  // --- 2. SEND MESSAGE ---
  socket.on('send_direct_msg', async (data) => {
    const { recipientId, _id: messageId } = data;
    
    const recipientSockets = userConnections.get(recipientId);
    const isRecipientOnline = recipientSockets && recipientSockets.size > 0;

    if (isRecipientOnline) {
        io.to(recipientId).emit('receive_direct_msg', data);
        
        io.to(recipientId).emit('new_notification', {
            type: 'message',
            senderName: data.senderName || "Officer",
            message: data.message
        });

        if (messageId) {
            try {
                await DirectMessage.findByIdAndUpdate(messageId, { status: 'delivered' });
                socket.emit('msg_status_update', { messageId, status: 'delivered' });
            } catch (e) {
                console.error("Error updating msg status:", e.message);
            }
        }
    }
  });

  // --- 3. SOS ALERT (Redundant if Controller Emits, but keeping for safety) ---
  socket.on('sos_alert', (data) => {
      console.log("⚡ SOS Alert received via Socket Event");
      io.emit('new_crime_report', { ...data, isSOS: true });
  });

  // --- 4. TYPING STATUS ---
  socket.on('typing', ({ senderId, recipientId }) => {
      io.to(recipientId).emit('partner_typing', { senderId });
  });

  socket.on('stop_typing', ({ senderId, recipientId }) => {
      io.to(recipientId).emit('partner_stop_typing', { senderId });
  });

  // --- 5. MARK SEEN ---
  socket.on('mark_seen', async (data) => {
    const { senderId, recipientId, messageIds } = data; 

    try {
        if(messageIds && messageIds.length > 0) {
            await DirectMessage.updateMany({ _id: { $in: messageIds } }, { status: 'seen', isRead: true });
        } else {
            await DirectMessage.updateMany(
                { senderId: recipientId, recipientId: senderId, status: { $ne: 'seen' } },
                { status: 'seen', isRead: true }
            );
        }

        io.to(recipientId).emit('msg_status_update_bulk', { 
            readerId: senderId, 
            status: 'seen'
        });
    } catch (e) {
        console.error("Error marking seen:", e.message);
    }
  });

  // --- 6. DISCONNECT ---
  socket.on('disconnect', async () => {
    for (const [userId, sockets] of userConnections.entries()) {
      if (sockets.has(socket.id)) {
        sockets.delete(socket.id);
        
        if (sockets.size === 0) {
            userConnections.delete(userId);
            
            // ✅ Fix: Don't try to update DB for Static Admin
            if (userId !== "ADMIN_ID_STATIC") {
                try {
                    const lastSeenTime = new Date();
                    await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: lastSeenTime });
                    
                    io.emit('user_status_change', { 
                        userId, 
                        status: 'offline', 
                        lastSeen: lastSeenTime 
                    });
                    console.log(`User ${userId} went Offline`);
                } catch (e) {
                    console.error("Error updating offline status:", e.message);
                }
            }
        }
        break;
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));