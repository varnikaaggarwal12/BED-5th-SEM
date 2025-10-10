const { WebSocketServer } = require('ws');
const wss = new WebSocketServer({ port: 8080 });

// Room storage: Map<roomId, Set<socket>>
const rooms = new Map();

wss.on('connection', (socket) => {
  console.log('✅ New user connected');

  socket.on('message', (msg) => {
    try {
      const data = JSON.parse(msg);
      const { type, payload } = data;

      // ---- CREATE ROOM ----
      if (type === 'create') {
        const roomId = Math.floor(Math.random() * 100000000).toString();
        rooms.set(roomId, new Set());
        socket.send(`🆕 Room created with ID: ${roomId}`);
      }

      // ---- JOIN ROOM ----
      else if (type === 'join') {
        const { roomId } = payload;
        if (!rooms.has(roomId)) {
          rooms.set(roomId, new Set());
          socket.send(`🆕 Room '${roomId}' created and joined.`);
        } else {
          socket.send(`✅ Joined existing room: ${roomId}`);
        }
        rooms.get(roomId).add(socket);
        socket.roomId = roomId;
      }

      // ---- CHAT MESSAGE ----
      else if (type === 'chat') {
        const { roomId, message } = payload;
        const room = rooms.get(roomId);

        if (room) {
          room.forEach((s) => {
            if (s !== socket) {
              s.send(JSON.stringify({
                from: roomId,
                message: message
              }));
            }
          });
        } else {
          socket.send(`⚠️ Room '${roomId}' not found. Please join or create it first.`);
        }
      }

      else {
        socket.send('❌ Unknown message type');
      }

    } catch (error) {
      socket.send('⚠️ Invalid message format (must be valid JSON)');
    }
  });

  socket.on('close', () => {
    if (socket.roomId && rooms.has(socket.roomId)) {
      rooms.get(socket.roomId).delete(socket);
      if (rooms.get(socket.roomId).size === 0) {
        rooms.delete(socket.roomId);
        console.log(`🗑️ Room '${socket.roomId}' deleted (empty)`);
      }
    }
  });
});