import jwt from 'jsonwebtoken';

export function verifyJWT(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.sendStatus(401);
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.sendStatus(401);
  }
}

export const requireRole =
  (role) =>
  (req, res, next) =>
    req.user?.role === role ? next() : res.sendStatus(403);
