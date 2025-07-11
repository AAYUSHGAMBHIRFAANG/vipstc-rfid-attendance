import { WebSocketServer } from 'ws';

/** ------------------------------------------------------------------
 *  Single shared WSS instance (filled inside initWebSocket)
 * ------------------------------------------------------------------ */
let wss = null;

/** ------------------------------------------------------------------
 *  initWebSocket(server)   — call once from app.js after app.listen()
 * ------------------------------------------------------------------ */
export function initWebSocket(server) {
  // If already initialised, just return the existing instance
  if (wss) return wss;

  wss = new WebSocketServer({ noServer: true });

  /* upgrade HTTP → WebSocket */
  server.on('upgrade', (req, socket, head) => {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith('/ws/session/')) return socket.destroy();

    wss.handleUpgrade(req, socket, head, (ws) => {
      ws.sessionId = url.pathname.split('/').pop();
      ws.isAlive = true;              // start heart-beat flag
      wss.emit('connection', ws);
    });
  });

  /* heart-beat */
  wss.on('connection', (ws) => {
    ws.on('pong', () => (ws.isAlive = true));
  });

  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) return ws.terminate();
      ws.isAlive = false;
      ws.ping();
    });
  }, 30_000);

  return wss;
}

/** ------------------------------------------------------------------
 *  broadcast(sessionId, event, data)
 * ------------------------------------------------------------------ */
export function broadcast(sessionId, event, data) {
  if (!wss) return;                       // not initialised yet
  const msg = JSON.stringify({ event, data });
  wss.clients.forEach((c) => {
    if (c.readyState === 1 && c.sessionId === String(sessionId)) {
      c.send(msg);
    }
  });
}

/** ------------------------------------------------------------------
 *  Exports
 * ------------------------------------------------------------------ */
export { wss };
