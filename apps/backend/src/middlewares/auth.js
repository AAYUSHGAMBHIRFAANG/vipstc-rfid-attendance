import { verifyToken } from '../utils/jwt.js';

/** ACCESS TOKEN VERIFICATION */
export function verifyJWT(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.sendStatus(401);
  try {
    req.user = verifyToken(token);
    next();
  } catch {
    return res.sendStatus(401);
  }
}

/** ROLE HIERARCHY  (ADMIN > PCOORD > TEACHER > DEVICE) */
const hierarchy = ['DEVICE', 'TEACHER', 'PCOORD', 'ADMIN'];

export const requireRole =
  (minRole) =>
  (req, res, next) => {
    const uRole = req.user?.role;
    if (!uRole) return res.sendStatus(401);
    if (hierarchy.indexOf(uRole) >= hierarchy.indexOf(minRole)) return next();
    return res.sendStatus(403);
  };
