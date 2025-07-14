// at top of file
import { getTeacherSections } from '../services/sessionService.js';

// below your existing routes, before errorHandler
/**
 * GET /api/session/mine/sections
 * Returns the list of sections this TEACHER is assigned to teach.
 */
sessionRouter.get(
  '/mine/sections',
  verifyJWT,
  requireRole('TEACHER'),
  asyncWrap(async (req, res) => {
    const teacherId = req.user.sub;
    const sections  = await getTeacherSections(teacherId);
    res.json(sections);
  })

);
