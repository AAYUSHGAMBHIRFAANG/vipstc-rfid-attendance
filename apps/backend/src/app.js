import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import { logger, loggerConsole } from './middlewares/logger.js';
import { errorHandler } from './middlewares/error.js';

import { authRouter } from './routes/auth.js';
import { deviceRouter } from './routes/device.js';
import { sessionRouter } from './routes/session.js';
import { scanRouter } from './routes/scan.js';
import { initWebSocket } from './websocket.js';

dotenv.config({ path: './.env' });

const app = express();
app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH'] }));
app.use(loggerConsole);       // pretty output to console
app.use(logger);              // file log

app.use(express.json());

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRouter);
app.use('/api/device', deviceRouter);
app.use('/api/session', sessionRouter);
app.use('/api/scan', scanRouter);

app.use(errorHandler); 
// Monkey-patch app.listen to always init WebSocket
const originalListen = app.listen.bind(app);
app.listen = (...args) => {
  const server = originalListen(...args);
  initWebSocket(server);
  return server;
};

// Only start the server when run directly (not when imported by tests)
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`API 🚀  on :${PORT}`));
}

export function createApp() {
  return app;
}
export default createApp;