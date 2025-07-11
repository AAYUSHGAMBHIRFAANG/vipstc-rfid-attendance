import { Router } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '../services/prisma.js';

export const deviceRouter = Router();

deviceRouter.post('/handshake', async (req, res) => {
  const { mac, secret } = req.body || {};
  const dev = await prisma.device.findUnique({ where: { macAddr: mac } });
  if (!dev || dev.secret !== secret) return res.sendStatus(404);

  const token = jwt.sign({ dev: dev.id, role: 'DEVICE' }, process.env.JWT_SECRET, {
    expiresIn: '30m'
  });
  res.json({ jwt: token, serverTime: Date.now() });
});
