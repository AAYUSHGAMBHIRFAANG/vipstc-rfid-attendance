import { WebSocketServer } from 'ws';

export function initWebSocket(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/ws/session/')) return socket.destroy();
    wss.handleUpgrade(req, socket, head, (ws) => {
      ws.sessionId = url.pathname.split('/').pop();
      wss.emit('connection', ws);
    });
  });

  wss.on('connection', (ws) => {
    ws.on('pong', () => (ws.isAlive = true));
  });

  /** broadcast helper */
  wss.sendToSession = (sessionId, event, data) => {
    wss.clients.forEach((c) => {
      if (c.readyState === 1 && c.sessionId === String(sessionId))
        c.send(JSON.stringify({ event, data }));
    });
  };

  // keep-alive
  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);
}
