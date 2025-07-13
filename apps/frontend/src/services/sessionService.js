// apps/backend/src/services/sessionService.js
import { prisma } from './prisma.js';

/**
 * Fetch all sections assigned to a given teacher,
 * including course and semester info.
 *
 * @param {number} teacherId
 * @returns {Promise<Array<{sectionId: number, sectionName: string, semesterNumber: number, semesterType: string, courseName: string}>>}
 */
export async function getSectionsForTeacher(teacherId) {
  const mappings = await prisma.subjectInstance.findMany({
    where: { facultyId: teacherId },
    include: {
      section: {
        include: {
          semester: {
            include: {
              course: true
            }
          }
        }
      }
    }
  });

  return mappings.map((m) => ({
    sectionId:     m.section.id,
    sectionName:   m.section.name,
    semesterNumber:m.section.semester.number,
    semesterType:  m.section.semester.type,
    courseName:    m.section.semester.course.name
  }));
}
