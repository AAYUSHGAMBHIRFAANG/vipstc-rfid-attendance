import { prisma } from './prisma.js';
import createError from 'http-errors';

export async function openSession(facultyId, sectionId) {  
    const subjInst = await prisma.subjectInstance.findFirst({
    where: { facultyId, sectionId }
  });
  if (!subjInst) throw createError(400, 'No subject mapping for this teacher & section');
  return prisma.classSession.create({
    data: {
      teacherId: facultyId,
      sectionId,
      subjectInstId: subjInst.id,
      startAt: new Date(),
      isClosed: false
    }
  });
}
export async function attachDevice(sessionId, deviceId) {
  return prisma.classSession.update({
    where: { id: sessionId },
    data: { deviceId }
  });
}

export async function closeSession(sessionId) {
  const session = await prisma.classSession.findUnique({ where: { id: sessionId } });
  if (!session) throw createError(404, 'session not found');
  if (session.isClosed) return session;

  // Mark session closed
  const closed = await prisma.classSession.update({
    where: { id: sessionId },
    data: { endAt: new Date(), isClosed: true }
  });

  // Mark ABSENT for students not scanned
  await prisma.$executeRawUnsafe(
    `
    INSERT INTO "AttendanceLog"(studentId, "sessionId", status, timestamp, "deviceId")
    SELECT s.id, $1, 'ABSENT', NOW(), $2
    FROM "Student" s
    WHERE s."sectionId" = $3
      AND NOT EXISTS (
        SELECT 1 FROM "AttendanceLog"
        WHERE "sessionId" = $1 AND "studentId" = s.id
      );`,
    sessionId,
    session.deviceId || null,
    session.sectionId
  );

  return closed;
}
