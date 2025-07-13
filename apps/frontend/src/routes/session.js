// apps/backend/src/routes/session.js
import * as sessionSvc from '../services/sessionService.js';

// ... existing imports and router setup ...

/* ---- GET /api/session/mine/sections -------------------------------- */
sessionRouter.get(
  '/mine/sections',
  verifyJWT,
  requireRole('TEACHER'),
  asyncWrap(async (req, res) => {
    const teacherId = req.user.sub;
    const sections = await sessionSvc.getSectionsForTeacher(teacherId);
    res.json({ sections });
  })
);
