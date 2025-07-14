// apps/backend/src/services/sessionService.js
import { prisma } from './prisma.js';

// src/services/sessionService.js
export async function openSession(teacherId, sectionId) {
  // find the mapping SubjectInstance for this teacher & section
  const subjInst = await prisma.subjectInstance.findFirst({
    where: { facultyId: teacherId, sectionId }
  });
  if (!subjInst) throw createError(400, 'No subject mapping');

  // only these four fields:
  return prisma.classSession.create({
    data: {
      teacherId,
      subjectInstId: subjInst.id,
      startAt: new Date(),
      isClosed: false
    }
  });
}
